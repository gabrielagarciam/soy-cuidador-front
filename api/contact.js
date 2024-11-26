import { Resend } from 'resend';
import validator from 'validator';

const resend = new Resend(process.env.RESEND_API_KEY);

const MAX_NAME_LENGTH = 100;
const MAX_MESSAGE_LENGTH = 1000;

/**
 * Validate and sanitize input data
 * @param {Object} data - Incoming request payload
 * @throws {Error} If validation fails
 */
function validateInput(data) {
    // Check for missing fields
    if (!data || typeof data !== 'object') {
        throw new Error('Invalid payload');
    }

    const { name, email, message } = data;

    // Name validation
    if (!name || typeof name !== 'string') {
        throw new Error('Invalid name');
    }

    const sanitizedName = validator.escape(name.trim());

    if (sanitizedName.length === 0 || sanitizedName.length > MAX_NAME_LENGTH) {
        throw new Error(`Name must be between 1-${MAX_NAME_LENGTH} characters`);
    }

    // Email validation
    if (!email || typeof email !== 'string') {
        throw new Error('Invalid email');
    }
    if (!validator.isEmail(email)) {
        throw new Error('Invalid email format');
    }

    // Message validation
    if (!message || typeof message !== 'string') {
        throw new Error('Invalid message');
    }

    const sanitizedMessage = validator.escape(message.trim());

    if (sanitizedMessage.length === 0 || sanitizedMessage.length > MAX_MESSAGE_LENGTH) {
        throw new Error(`Message must be between 1-${MAX_MESSAGE_LENGTH} characters`);
    }

    return {
        sanitizedName,
        email,
        sanitizedMessage
    };
}

/**
 * Vercel Serverless Function Handler
 * @param {Object} req - Incoming request
 * @param {Object} res - Response object
 */
export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle OPTIONS request for CORS preflight
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only allow POST method
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method Not Allowed' });
        return;
    }

    try {
        const { sanitizedName, email, sanitizedMessage } = validateInput(req.body);

        // Send email using Resend
        const { error } = await resend.emails.send({
            from: 'Your Company <onboarding@resend.dev>',
            to: 'soycuidador.info@gmail.com',
            subject: `New Contact Form Submission from ${sanitizedName}`,
            html: `
                <h1>New Contact Form Submission</h1>
                <p><strong>Name:</strong> ${sanitizedName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${sanitizedMessage}</p>
              `
        });

        if (error) {
            console.error('Email sending failed:', error);
            res.status(500).json({ error: 'Failed to send email' });
            return;
        }

        // Success response
        res.status(200).json({ message: 'Message sent successfully' });

    } catch (error) {
        console.error('Contact form error:', error);

        // Determine appropriate error response
        const statusCode = error.message.includes('Invalid') ? 400 : 500;
        res.status(statusCode).json({
            error: error.message || 'An unexpected error occurred'
        });
    }
}