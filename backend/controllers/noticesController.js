import { Notice, NoticeEvent } from '../models/index.js';

export const getNotices = async (req, res) => {
  try {
    const { town, status, issue } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (issue) filter.issue_type = issue;
    if (town) filter.town_id = town;

    const notices = await Notice.find(filter)
      .populate('property_id')
      .populate('town_id')
      .populate('corridor_id')
      .sort({ created_at: -1 });

    res.status(200).json({
      success: true,
      count: notices.length,
      data: notices
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getNoticeById = async (req, res) => {
  try {
    const { id } = req.params;
    const notice = await Notice.findById(id)
      .populate('property_id')
      .populate('town_id')
      .populate('corridor_id')
      .populate('alternate_property_id');

    if (!notice) {
      return res.status(404).json({ success: false, message: 'Notice not found' });
    }

    res.status(200).json({ success: true, data: notice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createNotice = async (req, res) => {
  try {
    const notice = new Notice(req.body);
    await notice.save();

    // Create corresponding notice event
    const event = new NoticeEvent({
      notice_id: notice._id,
      event_type: 'created',
      payload: req.body
    });
    await event.save();

    res.status(201).json({ success: true, data: notice });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Notice.findByIdAndUpdate(id, req.body, { new: true });

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Notice not found' });
    }

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
