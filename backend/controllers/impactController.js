import { Notice, Property, ImpactStory, ImpactProblem } from '../models/index.js';

export const getStats = async (req, res) => {
  try {
    const activeStatuses = ['open', 'caution', 'disrupted', 'closed'];
    const activeNotices = await Notice.find({ status: { $in: activeStatuses } })
      .select('town verifiedBy')
      .lean();

    const stays = new Set(activeNotices.map((n) => n.verifiedBy).filter(Boolean));
    const towns = new Set(activeNotices.map((n) => n.town).filter(Boolean));

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const resolvedToday = await Notice.countDocuments({
      status: 'resolved',
      updatedAt: { $gte: startOfDay },
    });

    res.json({
      staysReporting: stays.size,
      townsAffected: towns.size,
      // ~12 guests reached per active notice (no per-property occupancy in the schema)
      guestsWarned: activeNotices.length * 12,
      resolvedToday,
    });
  } catch (error) {
    console.error('Error fetching impact stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};

export const getStories = async (req, res) => {
  try {
    let stories = await ImpactStory.find();
    if (stories.length === 0) {
      const seedStories = [
        {
          title: "Ella Owner",
          headline: "Is the road to Ella still open?",
          content: "A guesthouse owner in Ella updating guests on alternative routes after a landslide blocked the main pass.",
          author: "Kumara, Ella"
        },
        {
          title: "Negombo Couple",
          headline: "A ruined holiday prevented",
          content: "A couple travelling to Negombo received an alert just in time about flooded access roads, saving them hours of traffic.",
          author: "Sarah & John"
        },
        {
          title: "Meemure Bridge",
          headline: "Bridge unsafe for heavy vehicles",
          content: "Local operators reported a weakened bridge in Meemure, preventing large vans from getting stuck on narrow mountain roads.",
          author: "Meemure Safari Team"
        }
      ];
      stories = await ImpactStory.insertMany(seedStories);
    }
    res.json(stories);
  } catch (error) {
    console.error('Error fetching stories:', error);
    res.status(500).json({ error: 'Failed to fetch stories' });
  }
};

export const createStory = async (req, res) => {
  try {
    const newStory = new ImpactStory(req.body);
    await newStory.save();
    res.status(201).json(newStory);
  } catch (error) {
    console.error('Error creating story:', error);
    res.status(500).json({ error: 'Failed to create story' });
  }
};

export const updateStory = async (req, res) => {
  try {
    const updated = await ImpactStory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Story not found' });
    res.json(updated);
  } catch (error) {
    console.error('Error updating story:', error);
    res.status(500).json({ error: 'Failed to update story' });
  }
};

export const deleteStory = async (req, res) => {
  try {
    const deleted = await ImpactStory.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Story not found' });
    res.json({ message: 'Story deleted' });
  } catch (error) {
    console.error('Error deleting story:', error);
    res.status(500).json({ error: 'Failed to delete story' });
  }
};

export const getProblem = async (req, res) => {
  try {
    let problem = await ImpactProblem.findOne();
    if (!problem) {
      const seedProblem = new ImpactProblem({
        title: "Why StaySignal exists",
        context: "Ditwah + 2026 Monsoon",
        description: "During the devastating 2026 monsoon (Ditwah), the traditional way of sharing local road closures and hazards—WhatsApp groups—completely failed. Crucial updates got lost in hundreds of messages, leaving tourists stranded and guesthouse owners helpless as they couldn't reach incoming guests in time.",
        solution: "How it works: Post → Filter → Resolve",
        details: "StaySignal solves this by allowing local operators to Post verified notices, tourists to Filter by their travel corridor, and communities to mark them as Resolved once conditions improve."
      });
      problem = await seedProblem.save();
    }
    res.json(problem);
  } catch (error) {
    console.error('Error fetching problem details:', error);
    res.status(500).json({ error: 'Failed to fetch problem details' });
  }
};

export const updateProblem = async (req, res) => {
  try {
    let problem = await ImpactProblem.findOne();
    if (!problem) return res.status(404).json({ error: 'Problem not found' });
    
    problem = await ImpactProblem.findByIdAndUpdate(problem._id, req.body, { new: true });
    res.json(problem);
  } catch (error) {
    console.error('Error updating problem:', error);
    res.status(500).json({ error: 'Failed to update problem' });
  }
};
