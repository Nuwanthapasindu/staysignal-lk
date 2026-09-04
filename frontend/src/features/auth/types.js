// Shared shapes + a helper to read the backend error envelope
//   { error: { code, message, fields? } }

export const ROLES = { TRAVELLER: 'traveller', OWNER: 'owner' };

export const ROLE_LABELS = { traveller: 'Traveller', owner: 'Owner' };

/**
 * Normalise any thrown error (axios or otherwise) into { code, message, fields }.
 */
export function readApiError(err) {
  const envelope = err?.response?.data?.error;
  if (envelope) {
    return {
      code: envelope.code || 'ERROR',
      message: envelope.message || 'Something went wrong.',
      fields: envelope.fields || {},
    };
  }
  return { code: 'NETWORK', message: 'Network error — please try again.', fields: {} };
}
