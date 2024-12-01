import { Resend } from 'resend';
import validator from 'validator';
import { postHandler, Errors } from "../utils/index.js";

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
        throw Errors.unprocessableEntity('Invalid input', [{
            field: 'name',
            issue: 'Invalid data type supplied'
        }]);
    }

    const sanitizedName = validator.escape(name.trim());

    if (sanitizedName.length === 0 || sanitizedName.length > MAX_NAME_LENGTH) {
        throw Errors.unprocessableEntity('Invalid input', [{
            field: 'name',
            issue: `Name must be between 1-${MAX_NAME_LENGTH} characters`
        }]);
    }

    // Email validation
    if (!email || typeof email !== 'string') {
        throw Errors.unprocessableEntity('Invalid input', [{
            field: 'email',
            issue: 'Invalid data type supplied'
        }]);
    }

    if (!validator.isEmail(email)) {
        throw Errors.unprocessableEntity('Invalid input', [{
            field: 'email',
            issue: 'Invalid email format'
        }]);
    }

    // Message validation
    if (!message || typeof message !== 'string') {
        throw Errors.unprocessableEntity('Invalid input', [{
            field: 'message',
            issue: 'Invalid data type supplied'
        }]);
    }

    const sanitizedMessage = validator.escape(message.trim());

    if (sanitizedMessage.length === 0 || sanitizedMessage.length > MAX_MESSAGE_LENGTH) {
        throw Errors.unprocessableEntity('Invalid input', [{
            field: 'message',
            issue: `Message must be between 1-${MAX_MESSAGE_LENGTH} characters`
        }]);
    }

    return {
        sanitizedName,
        email,
        sanitizedMessage
    };
}

const handler = async (req, res) => {
    const { sanitizedName, email, sanitizedMessage } = validateInput(req.body);

    const { error } = await resend.emails.send({
        from: 'Your Company <onboarding@resend.dev>',
        to: 'gabrielpinto16@gmail.com',
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
        throw new Error(error.message);
    }

    res.status(200).json({ message: 'Message sent successfully' });
}

export default postHandler(handler);