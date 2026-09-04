/**
 * Ownership check for owner-authored records (notices, tourism destinations).
 *
 * A record with no `createdBy` is legacy/seed data — nobody "owns" it yet,
 * so any owner may still act on it (keeps demo/seed content editable).
 * A record WITH a `createdBy` may only be modified by that same user.
 */
export const isOwnedBy = (record, userId) => {
  const owner = record?.createdBy;
  if (!owner) return true; // unclaimed legacy record
  return String(owner) === String(userId);
};

export const OWNERSHIP_DENIED = 'You can only edit or delete records you created.';
