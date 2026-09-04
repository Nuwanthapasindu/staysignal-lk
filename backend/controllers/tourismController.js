import { TourismDestination } from '../models/index.js';

// Calculate summary statistics
const calculateTourismStats = async () => {
  const total = await TourismDestination.countDocuments();
  const active = await TourismDestination.countDocuments({ status: 'open' });
  const weatherAdvisory = await TourismDestination.countDocuments({ 
    $or: [{ status: 'caution' }, { status: 'danger' }] 
  });
  const draft = await TourismDestination.countDocuments({ status: 'draft' });

  return {
    totalDestinations: total || 32,
    totalDestinationsSub: '9 Provinces Logged',
    activeOpen: active || 28,
    activeOpenSub: 'Live to Foreign Desks',
    weatherAdvisory: weatherAdvisory || 2,
    weatherAdvisorySub: 'Monsoon Suspended',
    draftRevisions: draft || 2,
    draftRevisionsSub: 'Pending DWC Audit'
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
        { province: { $regex: search, $options: 'i' } }
      ];
    }

    if (category && category !== 'All Categories') {
      filter.category = category;
    }

    if (province && province !== 'All Provinces') {
      filter.province = { $regex: province, $options: 'i' };
    }

    if (status && status !== 'All Statuses') {
      if (status === 'Published / Open' || status === 'open') filter.status = 'open';
      else if (status === 'Caution / Warning' || status === 'caution') filter.status = 'caution';
      else if (status === 'Suspended' || status === 'danger') filter.status = 'danger';
      else if (status === 'Draft Review' || status === 'draft') filter.status = 'draft';
    }

    const destinations = await TourismDestination.find(filter).sort({ created_at: -1 });
    const stats = await calculateTourismStats();

    res.status(200).json({
      success: true,
      stats,
      count: destinations.length,
      data: destinations
    });
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
    const data = req.body;

    if (!data.name) {
      return res.status(400).json({ success: false, message: 'Attraction name is required' });
    }

    // Generate unique slug
    if (!data.slug) {
      data.slug = data.name.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }

    // Check slug collision
    const existing = await TourismDestination.findOne({ slug: data.slug });
    if (existing) {
      data.slug = `${data.slug}-${Date.now().toString().slice(-4)}`;
    }

    if (!data.nodeId) {
      data.nodeId = 'LK-SLTDA-' + Math.floor(1000 + Math.random() * 9000);
    }
    // Required-by-schema fields — fill sensible placeholders if the form left them blank.
    if (!data.province) data.province = 'Not specified';
    if (!data.district) data.district = 'Not specified';
    if (!data.category) data.category = 'Heritage & Archaeological';

    const destination = new TourismDestination(data);
    await destination.save();

    res.status(201).json({
      success: true,
      message: 'Tourism destination registered successfully',
      data: destination
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateDestination = async (req, res) => {
  try {
    const { id } = req.params;
    const query = id.match(/^[0-9a-fA-F]{24}$/) ? { _id: id } : { slug: id.toLowerCase() };
    const updated = await TourismDestination.findOneAndUpdate(query, req.body, { 
      new: true, 
      runValidators: true 
    });

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Destination not found' });
    }

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, statusText, statusSub } = req.body;

    const updateFields = { status };
    if (statusText) updateFields.statusText = statusText;
    if (statusSub !== undefined) updateFields.statusSub = statusSub;

    const query = id.match(/^[0-9a-fA-F]{24}$/) ? { _id: id } : { slug: id.toLowerCase() };
    const updated = await TourismDestination.findOneAndUpdate(query, updateFields, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Destination not found' });
    }

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteDestination = async (req, res) => {
  try {
    const { id } = req.params;
    const query = id.match(/^[0-9a-fA-F]{24}$/) ? { _id: id } : { slug: id.toLowerCase() };
    const deleted = await TourismDestination.findOneAndDelete(query);

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Destination not found' });
    }

    res.status(200).json({ success: true, message: 'Destination deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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
