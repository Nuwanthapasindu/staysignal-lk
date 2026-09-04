/**
 * An error carrying an HTTP status and the API error envelope shape:
 *   { error: { code, message, fields? } }
 * The global error handler in app.js serialises these.
 */
export class HttpError extends Error {
  constructor(status, code, message, fields) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.code = code;
    this.fields = fields;
  }
}

export const httpError = (status, code, message, fields) => new HttpError(status, code, message, fields);
