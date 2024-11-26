export const errorHandler = (handler) => {
    return async (req, res) => {
        try {
            // Execute the original route handler
            await handler(req, res);
        } catch (error) {
            // Log the error (useful for debugging)
            console.error('Unhandled error:', error);

            // Determine the appropriate status code
            const statusCode = error.statusCode || 500;

            // Send error response
            res.status(statusCode).json({
                error: true,
                message: error.message || 'Internal Server Error',
                // Optional: include stack trace in development
                ...(process.env.NODE_ENV === 'development' && {
                    stack: error.stack
                })
            });
        }
    };
};