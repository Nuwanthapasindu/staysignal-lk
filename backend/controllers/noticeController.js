import {
  getNotices,
  getNoticeById,
  getNoticeAlternatives,
  getTickerData,
  addNotice,
  updateNotice as updateNoticeStore,
  deleteNotice as deleteNoticeStore,
} from '../services/noticeStore.js';
import { validateNoticePayload } from '../validators/noticeValidator.js';

export const listNotices = async (req, res) => {
  try {
    const { town, issue, status, q, from, to, sort } = req.query;
    const result = await getNotices({ town, issue, status, q, from, to, sort });
    res.json(result);
  } catch (error) {
    console.error('Error in listNotices:', error);
    res.status(500).json({ error: 'Failed to fetch notices' });
  }
};

export const getNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const notice = await getNoticeById(id);
    if (!notice) {
      return res.status(404).json({ error: 'Notice not found' });
    }
    res.json(notice);
  } catch (error) {
    console.error('Error in getNotice:', error);
    res.status(500).json({ error: 'Failed to fetch notice details' });
  }
};

export const getAlternatives = async (req, res) => {
  try {
    const { id } = req.params;
    const alternatives = await getNoticeAlternatives(id);
    res.json(alternatives);
  } catch (error) {
    console.error('Error in getAlternatives:', error);
    res.status(500).json({ error: 'Failed to fetch nearby alternatives' });
  }
};

export const getTicker = async (req, res) => {
  try {
    const ticker = await getTickerData();
    res.json(ticker);
  } catch (error) {
    console.error('Error in getTicker:', error);
    res.status(500).json({ error: 'Failed to fetch ticker data' });
  }
};

export const updateNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await getNoticeById(id);
    if (!existing) {
      return res.status(404).json({ error: 'Notice not found' });
    }

    const merged = { ...existing, ...req.body };
    const { isValid, errors } = validateNoticePayload(merged);
    if (!isValid) {
      return res.status(400).json({ error: 'Validation failed for operational notice', details: errors });
    }

    const updated = await updateNoticeStore(id, req.body);
    res.json(updated);
  } catch (error) {
    console.error('Error in updateNotice:', error);
    res.status(500).json({ error: 'Failed to update notice' });
  }
};

export const deleteNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const ok = await deleteNoticeStore(id);
    if (!ok) {
      return res.status(404).json({ error: 'Notice not found' });
    }
    res.json({ success: true, message: 'Notice removed from the Corridor Ledger' });
  } catch (error) {
    console.error('Error in deleteNotice:', error);
    res.status(500).json({ error: 'Failed to delete notice' });
  }
};

export const createNotice = async (req, res) => {
  try {
    const noticeData = req.body;
    if (!noticeData.title || !noticeData.town || !noticeData.headline) {
      return res.status(400).json({ error: 'Stay title, town, and headline are required.' });
    }
    const created = await addNotice(noticeData);
    res.status(201).json(created);
  } catch (error) {
    console.error('Error in createNotice:', error);
    res.status(500).json({ error: 'Failed to create notice' });
  }
};
