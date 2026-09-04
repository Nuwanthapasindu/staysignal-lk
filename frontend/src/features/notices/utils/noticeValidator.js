// Sri Lankan phone number regex supporting formats:
// 077 123 4567, 0771234567, +94 77 123 4567, +94771234567, 052 222 3490, 081 240 1902, etc.
export const isValidSriLankanPhone = (phone) => {
  if (!phone || typeof phone !== 'string') return false;
  const cleaned = phone.replace(/[\s\-\(\)\.]/g, '');
  const phoneRegex = /^(?:0|\+94|0094)?(?:7[0-8]|5[1-7]|81|91|63|41|11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|45|47|65|67)[0-9]{7}$/;
  return phoneRegex.test(cleaned);
};

export const VALID_STATUSES = ['open', 'caution', 'disrupted', 'closed', 'resolved'];

export const VALID_ISSUES = [
  'landslide',
  'road_closed',
  'flooded_access',
  'no_water',
  'power_cut',
  'bridge_unsafe',
  'network_down',
  'relocation',
];

/**
 * Validates a single notice field or entire notice object.
 * @param {Object} data - Notice form data
 * @returns {{ isValid: boolean, errors: Record<string, string> }}
 */
export const validateNoticeForm = (data = {}) => {
  const errors = {};

  // 1. Title
  const title = (data.title || '').trim();
  if (!title) {
    errors.title = 'Stay / Property name is required.';
  } else if (title.length < 3) {
    errors.title = 'Stay name must be at least 3 characters.';
  } else if (title.length > 80) {
    errors.title = 'Stay name cannot exceed 80 characters.';
  }

  // 2. Town
  const town = (data.town || '').trim().toLowerCase();
  if (!town) {
    errors.town = 'Town / Corridor hub selection is required.';
  }

  // 3. Corridor
  const corridor = (data.corridor || '').trim();
  if (!corridor) {
    errors.corridor = 'Specific road passage or corridor is required.';
  } else if (corridor.length < 3) {
    errors.corridor = 'Corridor name must be at least 3 characters.';
  } else if (corridor.length > 100) {
    errors.corridor = 'Corridor name cannot exceed 100 characters.';
  }

  // 4. Status
  const status = (data.status || '').trim().toLowerCase();
  if (!status) {
    errors.status = 'Operational status tier is required.';
  } else if (!VALID_STATUSES.includes(status)) {
    errors.status = `Invalid status tier. Must be one of: ${VALID_STATUSES.join(', ')}`;
  }

  // 5. Issue
  const issue = (data.issue || '').trim().toLowerCase();
  if (!issue) {
    errors.issue = 'Disruption category is required.';
  } else if (!VALID_ISSUES.includes(issue)) {
    errors.issue = `Invalid disruption category. Must be one of: ${VALID_ISSUES.join(', ')}`;
  }

  // 6. Headline
  const headline = (data.headline || '').trim();
  if (!headline) {
    errors.headline = 'Notice summary headline is required.';
  } else if (headline.length < 5) {
    errors.headline = 'Headline must be at least 5 characters.';
  } else if (headline.length > 120) {
    errors.headline = 'Headline cannot exceed 120 characters.';
  }

  // 7. Description
  const description = (data.description || '').trim();
  if (!description) {
    errors.description = 'Situation details & advisory description are required.';
  } else if (description.length < 10) {
    errors.description = 'Description must be at least 10 characters.';
  } else if (description.length > 1000) {
    errors.description = 'Description cannot exceed 1000 characters.';
  }

  // 8. Contact Number
  const contactNumber = (data.contactNumber || '').trim();
  if (!contactNumber) {
    errors.contactNumber = 'Host contact phone number is required for SIM verification.';
  } else if (!isValidSriLankanPhone(contactNumber)) {
    errors.contactNumber = 'Please enter a valid Sri Lankan phone number (e.g. 077 412 8901, 052 222 3490).';
  }

  // 9. Verified By
  const verifiedBy = (data.verifiedBy || '').trim();
  if (verifiedBy && verifiedBy.length > 60) {
    errors.verifiedBy = 'Verification source cannot exceed 60 characters.';
  }

  // 10. Bypass Advice
  const bypassAdvice = (data.bypassAdvice || '').trim();
  if (bypassAdvice && bypassAdvice.length > 300) {
    errors.bypassAdvice = 'Bypass guidance cannot exceed 300 characters.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validates an individual field dynamically on blur or change.
 */
export const validateNoticeField = (field, value, allData = {}) => {
  const checkData = { ...allData, [field]: value };
  const { errors } = validateNoticeForm(checkData);
  return errors[field] || null;
};
