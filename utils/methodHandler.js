import { errorHandler } from "./errorHandler.js";

export const methodHandler = (handlers) => {
    return async (req, res) => {
        // res.setHeader('Access-Control-Allow-Credentials', true);
        // res.setHeader('Access-Control-Allow-Origin', '*');
        // res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
        // res.setHeader(
        //     'Access-Control-Allow-Headers',
        //     'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
        // );


        // Handle OPTIONS request for CORS preflight
        if (req.method === 'OPTIONS') {
            res.status(200).end();
            return;
        }

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