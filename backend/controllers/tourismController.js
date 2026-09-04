import { TourismDestination } from '../models/index.js';
import { filesToImageDocs } from '../middleware/upload.js';
import { localStorageAdapter } from '../services/fileStorage.js';

// Fields the multipart form sends as JSON strings — parse them back to objects.
const JSON_FIELDS = ['regulations', 'contacts', 'specs', 'dossier', 'siteRules', 'corridorRadar', 'campAndStay', 'hotlines'];
// Never accept these straight from the client on write.
const RESERVED_FIELDS = new Set(['_id', 'id', '__v', 'slug', 'images', 'createdAt', 'updatedAt', 'created_at', 'updated_at']);

const coerceBody = (body = {}) => {
  const out = { ...body };
  for (const field of JSON_FIELDS) {
    if (typeof out[field] === 'string' && out[field].trim()) {
      try {
        out[field] = JSON.parse(out[field]);
      } catch {
        /* leave the raw value; mongoose will reject if truly invalid */
      }
    }
  }
  return out;
};

const parseIdList = (value) => {
  if (Array.isArray(value)) return value.map(String);
  if (typeof value === 'string' && value.trim()) {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed.map(String) : [String(parsed)];
    } catch {
      return value.split(',').map((s) => s.trim()).filter(Boolean);
    }
  }
  return [];
};

const cleanupUploads = (req) => {
  (req.files || []).forEach((f) => localStorageAdapter.remove(localStorageAdapter.relativePath('tourism', f.filename)));
};

const findByIdOrSlug = (id) =>
  id.match(/^[0-9a-fA-F]{24}$/)
    ? TourismDestination.findOne({ $or: [{ _id: id }, { slug: id.toLowerCase() }] })
    : TourismDestination.findOne({ slug: id.toLowerCase() });

// Calculate summary statistics — strictly reflects what is in the database.
const calculateTourismStats = async () => {
  const [total, active, caution, danger, draft, provinces] = await Promise.all([
    TourismDestination.countDocuments(),
    TourismDestination.countDocuments({ status: 'open' }),
    TourismDestination.countDocuments({ status: 'caution' }),
    TourismDestination.countDocuments({ status: 'danger' }),
    TourismDestination.countDocuments({ status: 'draft' }),
    TourismDestination.distinct('province'),
  ]);

  const provinceCount = provinces.filter(Boolean).length;
  const weatherAdvisory = caution + danger;

  return {
    totalDestinations: total,
    totalDestinationsSub: `${provinceCount} Province${provinceCount === 1 ? '' : 's'} Logged`,
    activeOpen: active,
    activeOpenSub: 'Published / Open',
    weatherAdvisory,
    weatherAdvisorySub: `${caution} Caution · ${danger} Suspended`,
    draftRevisions: draft,
    draftRevisionsSub: 'Pending Review',
  };
};

export const getDestinations = async (req, res) => {
  try {
    const { search, category, province, status } = req.query;
    const filter = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { nodeId: { $regex: search, $options: 'i' } },
        { district: { $regex: search, $options: 'i' } },
        { province: { $regex: search, $options: 'i' } },
      ];
    }

    if (category && category !== 'All Categories') filter.category = category;
    if (province && province !== 'All Provinces') filter.province = { $regex: province, $options: 'i' };

    if (status && status !== 'All Statuses') {
      if (status === 'Published / Open' || status === 'open') filter.status = 'open';
      else if (status === 'Caution / Warning' || status === 'caution') filter.status = 'caution';
      else if (status === 'Suspended' || status === 'danger') filter.status = 'danger';
      else if (status === 'Draft Review' || status === 'draft') filter.status = 'draft';
    }

    const destinations = await TourismDestination.find(filter).sort({ created_at: -1 });
    const stats = await calculateTourismStats();

    res.status(200).json({ success: true, stats, count: destinations.length, data: destinations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getDestinationBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    let destination = await TourismDestination.findOne({ slug: slug.toLowerCase() });

    if (!destination && slug.match(/^[0-9a-fA-F]{24}$/)) {
      destination = await TourismDestination.findById(slug);
    }

    if (!destination) {
      return res.status(404).json({ success: false, message: 'Tourism destination not found' });
    }

    res.status(200).json({ success: true, data: destination });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createDestination = async (req, res) => {
  try {
    const data = coerceBody(req.body);

    if (!data.name) {
      cleanupUploads(req);
      return res.status(400).json({ success: false, message: 'Attraction name is required' });
    }

    if (!data.slug) {
      data.slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }

    const existing = await TourismDestination.findOne({ slug: data.slug });
    if (existing) data.slug = `${data.slug}-${Date.now().toString().slice(-4)}`;

    if (!data.nodeId) data.nodeId = 'LK-SLTDA-' + Math.floor(1000 + Math.random() * 9000);
    if (!data.province) data.province = 'Not specified';
    if (!data.district) data.district = 'Not specified';
    if (!data.category) data.category = 'Heritage & Archaeological';

    const imageDocs = filesToImageDocs(req.files);
    if (imageDocs.length) {
      data.images = imageDocs;
      if (!data.heroImage) data.heroImage = imageDocs[0].url;
    }

    const destination = new TourismDestination(data);
    await destination.save();

    res.status(201).json({
      success: true,
      message: 'Tourism destination registered successfully',
      data: destination,
    });
  } catch (error) {
    cleanupUploads(req);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateDestination = async (req, res) => {
  try {
    const destination = await findByIdOrSlug(req.params.id);
    if (!destination) {
      cleanupUploads(req);
      return res.status(404).json({ success: false, message: 'Destination not found' });
    }

    const body = coerceBody(req.body);
    const removeIds = parseIdList(body.removeImageIds);
    delete body.removeImageIds;

    // Apply scalar / object fields. Skip empties so a partial multipart update
    // doesn't wipe existing values.
    for (const [key, value] of Object.entries(body)) {
      if (RESERVED_FIELDS.has(key)) continue;
      if (value === '' || value === undefined || value === null) continue;
      destination[key] = value;
    }

    // Remove selected images (and their files on disk).
    if (removeIds.length) {
      destination.images = destination.images.filter((img) => {
        const drop = removeIds.includes(String(img._id));
        if (drop) localStorageAdapter.remove(img.path);
        return !drop;
      });
    }

    // Append any newly uploaded images.
    const newImages = filesToImageDocs(req.files);
    if (newImages.length) destination.images.push(...newImages);

    // heroImage always mirrors the first uploaded image (or clears when none).
    destination.heroImage = destination.images[0]?.url || '';

    await destination.save();
    res.status(200).json({ success: true, data: destination });
  } catch (error) {
    cleanupUploads(req);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status, statusText, statusSub } = req.body;
    const updateFields = { status };
    if (statusText) updateFields.statusText = statusText;
    if (statusSub !== undefined) updateFields.statusSub = statusSub;

    const query = req.params.id.match(/^[0-9a-fA-F]{24}$/)
      ? { _id: req.params.id }
      : { slug: req.params.id.toLowerCase() };
    const updated = await TourismDestination.findOneAndUpdate(query, updateFields, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Destination not found' });

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteDestination = async (req, res) => {
  try {
    const query = req.params.id.match(/^[0-9a-fA-F]{24}$/)
      ? { _id: req.params.id }
      : { slug: req.params.id.toLowerCase() };
    const deleted = await TourismDestination.findOneAndDelete(query);

    if (!deleted) return res.status(404).json({ success: false, message: 'Destination not found' });

    // Purge the destination's uploaded files from disk.
    (deleted.images || []).forEach((img) => localStorageAdapter.remove(img.path));

    res.status(200).json({ success: true, message: 'Destination deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /tourism/:id/images  — add one or more images to an existing destination
export const addDestinationImages = async (req, res) => {
  try {
    const newImages = filesToImageDocs(req.files);
    if (!newImages.length) {
      return res.status(400).json({ success: false, message: 'No image files received.' });
    }

    const destination = await findByIdOrSlug(req.params.id);
    if (!destination) {
      cleanupUploads(req);
      return res.status(404).json({ success: false, message: 'Destination not found' });
    }

    destination.images.push(...newImages);
    destination.heroImage = destination.images[0]?.url || '';
    await destination.save();

    res.status(200).json({ success: true, data: destination });
  } catch (error) {
    cleanupUploads(req);
    res.status(400).json({ success: false, message: error.message });
  }
};

// DELETE /tourism/:id/images/:imageId  — remove a single image
export const deleteDestinationImage = async (req, res) => {
  try {
    const { imageId } = req.params;
    const destination = await findByIdOrSlug(req.params.id);
    if (!destination) return res.status(404).json({ success: false, message: 'Destination not found' });

    const target = destination.images.find((img) => String(img._id) === String(imageId));
    if (!target) return res.status(404).json({ success: false, message: 'Image not found on this destination' });

    localStorageAdapter.remove(target.path);
    destination.images = destination.images.filter((img) => String(img._id) !== String(imageId));
    destination.heroImage = destination.images[0]?.url || '';
    await destination.save();

    res.status(200).json({ success: true, data: destination });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getTourismStats = async (req, res) => {
  try {
    const stats = await calculateTourismStats();
    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
