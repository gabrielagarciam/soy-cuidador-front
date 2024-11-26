import HttpError from './HttpError.js';

export const errorHandler = (req, res, error) => {
    console.error('[API ERROR]:', error);

    const statusCode = error.statusCode || 500;

    res.status(statusCode).json({
        message: error.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && {
            stack: error.stack
        })
    });
};

export const Errors = {
    badRequest: (message, details) =>
        new HttpError(message, 400, details),

    unauthorized: (message, details) =>
        new HttpError(message, 401, details),

    forbidden: (message, details) =>
        new HttpError(message, 403, details),

    notFound: (message, details) =>
        new HttpError(message, 404, details),

    conflict: (message, details) =>
        new HttpError(message, 409, details),

    unprocessableEntity: (message, details) =>
        new HttpError(message, 422, details)
};