import { connectToDatabase } from '../db.js';

// Email validation regex (basic validation)
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            // Get the email from the request body
            const { email } = req.body;

            // Validate the email format
            if (!email || !emailRegex.test(email)) {
                return res.status(400).json({ error: 'Invalid email format' });
            }

            // Connect to the database
            const { db } = await connectToDatabase();

            // Check if email already exists in the emailSubscriptions collection
            const existingEmail = await db
                .collection('emailSubscriptions')
                .findOne({ email });

            if (existingEmail) {
                return res.status(409).json({ error: 'Email already subscribed' });
            }

            // Insert the email into the collection
            const result = await db.collection('emailSubscriptions').insertOne({ email });

            // Return a success response
            res.status(200).json({ message: 'Successfully subscribed', email: result.ops[0] });
        } catch (error) {
            console.error('Error subscribing email:', error);
            res.status(500).json({ error: 'Internal Server Error', details: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
