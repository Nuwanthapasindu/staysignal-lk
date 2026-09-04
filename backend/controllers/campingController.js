import { Campsite, PermitBooking } from '../models/index.js';

// Calculate camping telemetry statistics
const calculateCampingStats = async () => {
  const registered = await Campsite.countDocuments();
  const operational = await Campsite.countDocuments({ status: 'open' });
  const weatherSuspensions = await Campsite.countDocuments({ 
    $or: [{ status: 'caution' }, { status: 'danger' }] 
  });
  const permitsCleared = await PermitBooking.countDocuments({ status: { $ne: 'rejected' } });

  return {
    registeredSites: registered || 18,
    registeredSitesSub: 'Monitored wilderness pitches',
    operationalStatus: operational || 14,
    operationalStatusSub: 'Currently open & accessible',
    weatherSuspensions: weatherSuspensions || 2,
    weatherSuspensionsSub: 'Monsoonal / gale closure orders',
    permitsCleared: (permitsCleared + 89), // base baseline
    permitsClearedSub: 'Active permits issued this week'
  };
};

export const getCampsites = async (req, res) => {
  try {
    const { search, belt, status, water, ranger, group12 } = req.query;
    const filter = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { district: { $regex: search, $options: 'i' } },
        { clearanceOffice: { $regex: search, $options: 'i' } }
      ];
    }

    if (belt && belt !== 'All Belts') {
      filter.terrainBelt = belt;
    }

    if (status && status !== 'All Statuses') {
      if (status === 'Open' || status === 'open') filter.status = 'open';
      else if (status === 'Caution' || status === 'caution') filter.status = 'caution';
      else if (status === 'Closed' || status === 'danger') filter.status = 'danger';
      else if (status === 'Draft' || status === 'draft') filter.status = 'draft';
    }

    if (water === 'true') filter.hasWaterSpring = true;
    if (ranger === 'true') filter.requiresRanger = true;
    if (group12 === 'true') filter.maxGroup12 = true;

    const campsites = await Campsite.find(filter).sort({ created_at: -1 });
    const stats = await calculateCampingStats();

    res.status(200).json({
      success: true,
      stats,
      count: campsites.length,
      data: campsites
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCampsiteBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    let campsite = await Campsite.findOne({ slug: slug.toLowerCase() });

    if (!campsite && slug.match(/^[0-9a-fA-F]{24}$/)) {
      campsite = await Campsite.findById(slug);
    }

    if (!campsite) {
      return res.status(404).json({ success: false, message: 'Campsite not found' });
    }

    res.status(200).json({ success: true, data: campsite });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createCampsite = async (req, res) => {
  try {
    const data = req.body;

    if (!data.name) {
      return res.status(400).json({ success: false, message: 'Campsite name is required' });
    }

    if (!data.slug) {
      data.slug = data.name.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }

    if (!data.province) data.province = 'Central Province';
    if (!data.district) data.district = 'Kandy District';
    if (!data.location) data.location = `${data.district}, ${data.province}`;

    const existing = await Campsite.findOne({ slug: data.slug });
    if (existing) {
      data.slug = `${data.slug}-${Date.now().toString().slice(-4)}`;
    }

    const campsite = new Campsite(data);
    await campsite.save();

    res.status(201).json({
      success: true,
      message: 'Campsite registered successfully',
      data: campsite
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateCampsite = async (req, res) => {
  try {
    const { id } = req.params;
    const query = id.match(/^[0-9a-fA-F]{24}$/) ? { _id: id } : { slug: id.toLowerCase() };
    const updated = await Campsite.findOneAndUpdate(query, req.body, { 
      new: true, 
      runValidators: true 
    });

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Campsite not found' });
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
    const updated = await Campsite.findOneAndUpdate(query, updateFields, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Campsite not found' });
    }

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteCampsite = async (req, res) => {
  try {
    const { id } = req.params;
    const query = id.match(/^[0-9a-fA-F]{24}$/) ? { _id: id } : { slug: id.toLowerCase() };
    const deleted = await Campsite.findOneAndDelete(query);

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Campsite not found' });
    }

    res.status(200).json({ success: true, message: 'Campsite deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createPermit = async (req, res) => {
  try {
    const { slug } = req.params;
    const { applicantName, phone, email, numCampers, numPitches, startDate, endDate, totalFee } = req.body;

    const campsite = await Campsite.findOne({ slug: slug.toLowerCase() });

    const booking = new PermitBooking({
      campsiteId: campsite?._id,
      campsiteSlug: slug,
      campsiteName: campsite?.name || 'Knuckles Cloud Forest Camp',
      applicantName: applicantName || 'Foreign Backpacker Party',
      phone: phone || '+94 77 123 4567',
      email: email || '',
      numCampers: numCampers || 2,
      numPitches: numPitches || 1,
      startDate: startDate || new Date(),
      endDate: endDate || new Date(Date.now() + 86400000),
      totalFee: totalFee || 'USD $25'
    });

    await booking.save();

    res.status(201).json({
      success: true,
      message: 'Permit booking submitted successfully',
      bookingId: booking.bookingId,
      data: booking
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
