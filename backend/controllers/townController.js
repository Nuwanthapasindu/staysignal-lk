import { getAllTowns } from '../services/noticeStore.js';

export const listTowns = async (req, res) => {
  try {
    const towns = await getAllTowns();
    res.json(towns);
  } catch (error) {
    console.error('Error in listTowns:', error);
    res.status(500).json({ error: 'Failed to fetch towns' });
  }
};
