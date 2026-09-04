import { Town, Corridor, Property, ImpactSnapshot } from '../models/index.js';

export const getTowns = async (req, res) => {
  try {
    const towns = await Town.find().sort({ name: 1 });
    res.status(200).json({ success: true, count: towns.length, data: towns });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTownBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const town = await Town.findOne({ slug });

    if (!town) {
      return res.status(404).json({ success: false, message: 'Town not found' });
    }

    const properties = await Property.find({ town_id: town._id });

    res.status(200).json({
      success: true,
      data: {
        town,
        properties
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCorridors = async (req, res) => {
  try {
    const corridors = await Corridor.find().populate('from_town_id').populate('to_town_id');
    res.status(200).json({ success: true, count: corridors.length, data: corridors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProperties = async (req, res) => {
  try {
    const { town } = req.query;
    const filter = {};
    if (town) filter.town_id = town;

    const properties = await Property.find(filter).populate('town_id');
    res.status(200).json({ success: true, count: properties.length, data: properties });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getImpact = async (req, res) => {
  try {
    const snapshot = await ImpactSnapshot.findOne().sort({ snapshot_date: -1 });
    res.status(200).json({
      success: true,
      data: snapshot || {
        active_notices_count: 5,
        resolved_notices_count: 42,
        relocations_count: 18,
        disrupted_towns_count: 3,
        snapshot_date: new Date()
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
