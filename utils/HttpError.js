export default class HttpError extends Error {
    constructor(message, statusCode = 500, details = {}) {
        super(message);

        // Attach custom properties
        this.name = 'HttpError';
        this.statusCode = statusCode;
        this.details = details;
    }
}
