/**
 * Ownership check for owner-authored records (notices, tourism destinations).
 *
 * Strict match only: a record may be modified only by the user who created
 * it. A record with no `createdBy` (pre-ownership legacy/seed data) has no
 * identifiable owner, so nobody — not even another owner — may edit or
 * delete it through this check.
 */
export const isOwnedBy = (record, userId) => {
  if (!userId || !record?.createdBy) return false;
  return String(record.createdBy) === String(userId);
};

export const OWNERSHIP_DENIED = 'You can only edit or delete records you created.';
