import Notice from '../models/Notice.js';
import Town from '../models/Town.js';
import { getIsMongoConnected } from '../config/db.js';
import { noticesData, townsData } from '../seed/seedData.js';

// In-memory clone of seed data for fallback / instant response
let memoryNotices = JSON.parse(JSON.stringify(noticesData));
let memoryTowns = JSON.parse(JSON.stringify(townsData));

const severityOrder = {
  disrupted: 1,
  caution: 2,
  open: 3,
  resolved: 4,
  closed: 5,
};

export const getAllTowns = async () => {
  if (getIsMongoConnected()) {
    try {
      const towns = await Town.find().lean();
      if (towns && towns.length > 0) return towns;
    } catch (e) {
      console.warn('Mongo town query error, using memory fallback', e.message);
    }
  }
  return memoryTowns;
};

export const getTownBySlug = async (slug) => {
  const target = String(slug || '').toLowerCase().trim();
  const towns = await getAllTowns();
  return towns.find(
    (t) => (t.slug || '').toLowerCase() === target || (t.id || '').toLowerCase() === target
  );
};

export const getNotices = async (filters = {}) => {
  const {
    town,
    issue,
    status,
    q,
    from,
    to,
    sort = 'newest'
  } = filters;

  let allNotices = [];

  if (getIsMongoConnected()) {
    try {
      allNotices = await Notice.find().lean();
    } catch (e) {
      console.warn('Mongo notice query error, using memory fallback', e.message);
      allNotices = memoryNotices;
    }
  } else {
    allNotices = memoryNotices;
  }

  // Ensure uniform ID
  let results = allNotices.map(n => ({
    ...n,
    id: n.customId || n.id || (n._id ? n._id.toString() : ''),
  }));

  // Filter: town
  if (town && town !== 'all') {
    const targetTown = town.toLowerCase().trim();
    results = results.filter(n => 
      n.town.toLowerCase() === targetTown || 
      n.townName.toLowerCase() === targetTown
    );
  }

  // Filter: issue
  if (issue && issue !== 'all') {
    const targetIssue = issue.toLowerCase().trim();
    results = results.filter(n => n.issue.toLowerCase() === targetIssue);
  }

  // Filter: status
  if (status && status !== 'all') {
    const targetStatus = status.toLowerCase().trim();
    results = results.filter(n => n.status.toLowerCase() === targetStatus);
  }

  // Filter: search keyword q
  if (q && q.trim()) {
    const query = q.toLowerCase().trim();
    results = results.filter(n => {
      const matchTitle = n.title?.toLowerCase().includes(query);
      const matchHeadline = n.headline?.toLowerCase().includes(query);
      const matchDesc = n.description?.toLowerCase().includes(query);
      const matchCorridor = n.corridor?.toLowerCase().includes(query);
      const matchTown = n.townName?.toLowerCase().includes(query);
      const matchBypass = n.bypassAdvice?.toLowerCase().includes(query);
      return matchTitle || matchHeadline || matchDesc || matchCorridor || matchTown || matchBypass;
    });
  }

  // Filter: date range
  if (from) {
    const fromDate = new Date(from);
    if (!isNaN(fromDate.getTime())) {
      results = results.filter(n => new Date(n.updatedAt || n.verifiedAt) >= fromDate);
    }
  }

  if (to) {
    const toDate = new Date(to);
    if (!isNaN(toDate.getTime())) {
      results = results.filter(n => new Date(n.updatedAt || n.verifiedAt) <= toDate);
    }
  }

  // Sort
  if (sort === 'severity') {
    results.sort((a, b) => {
      const orderA = severityOrder[a.status] || 99;
      const orderB = severityOrder[b.status] || 99;
      if (orderA !== orderB) return orderA - orderB;
      return new Date(b.updatedAt || b.verifiedAt) - new Date(a.updatedAt || a.verifiedAt);
    });
  } else if (sort === 'oldest') {
    results.sort((a, b) => new Date(a.updatedAt || a.verifiedAt) - new Date(b.updatedAt || b.verifiedAt));
  } else if (sort === 'town') {
    results.sort((a, b) => a.townName.localeCompare(b.townName));
  } else {
    // default: newest
    results.sort((a, b) => new Date(b.updatedAt || b.verifiedAt) - new Date(a.updatedAt || a.verifiedAt));
  }

  // Calculate aggregated stats across ALL notices (not just filtered)
  const stats = {
    total: allNotices.length,
    active: allNotices.filter(n => ['open', 'caution', 'disrupted'].includes(n.status)).length,
    open: allNotices.filter(n => n.status === 'open').length,
    caution: allNotices.filter(n => n.status === 'caution').length,
    disrupted: allNotices.filter(n => n.status === 'disrupted').length,
    closed: allNotices.filter(n => n.status === 'closed').length,
    resolved: allNotices.filter(n => n.status === 'resolved').length,
    townCounts: {},
  };

  // Town notice counts
  allNotices.forEach(n => {
    const t = n.town.toLowerCase();
    stats.townCounts[t] = (stats.townCounts[t] || 0) + 1;
  });

  return {
    notices: results,
    totalCount: results.length,
    stats,
  };
};

export const getNoticeById = async (id) => {
  let allNotices = [];
  if (getIsMongoConnected()) {
    try {
      allNotices = await Notice.find().lean();
    } catch (e) {
      allNotices = memoryNotices;
    }
  } else {
    allNotices = memoryNotices;
  }

  const cleanId = String(id).trim();
  const notice = allNotices.find(n => 
    n.customId === cleanId || 
    n.id === cleanId || 
    (n._id && n._id.toString() === cleanId)
  );

  if (!notice) return null;

  return {
    ...notice,
    id: notice.customId || notice.id || (notice._id ? notice._id.toString() : cleanId),
  };
};

export const getNoticeAlternatives = async (id) => {
  const notice = await getNoticeById(id);
  if (!notice) return [];

  let allNotices = [];
  if (getIsMongoConnected()) {
    try {
      allNotices = await Notice.find().lean();
    } catch (e) {
      allNotices = memoryNotices;
    }
  } else {
    allNotices = memoryNotices;
  }

  const cleanCurrentId = notice.id;
  const targetTown = notice.town.toLowerCase();

  // Find open stays nearby in the same town
  const alternatives = allNotices
    .map(n => ({
      ...n,
      id: n.customId || n.id || (n._id ? n._id.toString() : ''),
    }))
    .filter(n => 
      n.id !== cleanCurrentId &&
      n.town.toLowerCase() === targetTown &&
      n.status === 'open'
    );

  return alternatives;
};

export const getTickerData = async () => {
  let allNotices = [];
  if (getIsMongoConnected()) {
    try {
      allNotices = await Notice.find().lean();
    } catch (e) {
      allNotices = memoryNotices;
    }
  } else {
    allNotices = memoryNotices;
  }

  const urgent = allNotices.filter(n => n.isUrgent || n.status === 'disrupted');
  const disruptedCount = allNotices.filter(n => n.status === 'disrupted').length;
  const cautionCount = allNotices.filter(n => n.status === 'caution').length;
  const openCount = allNotices.filter(n => n.status === 'open').length;

  const tickerItems = urgent.map(n => ({
    id: n.customId || n.id || (n._id ? n._id.toString() : ''),
    type: 'URGENT',
    tag: 'DISPATCH',
    corridor: n.corridor,
    town: n.townName,
    message: `${n.townName} Passage: ${n.headline} · ${n.title}`,
    updatedAt: n.updatedAt || n.verifiedAt,
  }));

  if (tickerItems.length === 0) {
    tickerItems.push({
      id: 'system-status',
      type: 'NORMAL',
      tag: 'ALL CLEAR',
      corridor: 'All Monitored Corridors',
      town: 'Central Highlands',
      message: 'All major highland passes clear. Standard vehicular traffic operational.',
      updatedAt: new Date().toISOString(),
    });
  }

  return {
    items: tickerItems,
    counts: {
      total: allNotices.length,
      disrupted: disruptedCount,
      caution: cautionCount,
      open: openCount,
      monitoredDesks: 18,
      meshLatency: '99.4%',
      lastVerified: new Date(Date.now() - 4 * 60 * 1000).toISOString(),
    },
  };
};

export const addNotice = async (noticeData) => {
  const newNotice = {
    ...noticeData,
    id: noticeData.customId || `notice-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    verifiedAt: new Date().toISOString(),
  };

  if (getIsMongoConnected()) {
    try {
      const created = await Notice.create(newNotice);
      return created.toJSON();
    } catch (e) {
      console.warn('Mongo notice write error, saving to memory', e.message);
    }
  }

  memoryNotices.unshift(newNotice);
  return newNotice;
};
