import { errorHandler } from "./errorHandler.js";

export const methodHandler = (handlers) => {
    return async (req, res) => {
        const handler = handlers[req.method];

        try {
            // Validate that a handler exists for the current HTTP method
            if (!handler) {
                return res.status(405).json({
                    error: `Method ${req.method} Not Allowed`
                });
            }

            // Execute the specific method handler
            await handler(req, res);
        } catch (error) {
            errorHandler(handler);
        }
    };
};

export const getHandler = (handler) => methodHandler({ GET: handler });
export const postHandler = (handler) => methodHandler({ POST: handler });