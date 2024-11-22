import { connectToDatabase } from '../db.js';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { slug, increment } = req.body;

            // Ensure that slug and increment values are provided and valid
            if (!slug || (increment !== 1 && increment !== -1)) {
                return res.status(400).json({ error: 'Invalid request. Slug is required and increment must be 1 or -1.' });
            }

            // Connect to the database
            const { db } = await connectToDatabase();

            // Update the likeCount field
            const updatedBlogPost = await db.collection('cuidador_front_collection').findOneAndUpdate(
                { slug }, // Query filter
                { $inc: { likeCount: increment } }, // Increment (or decrement) likeCount by 1
                { returnDocument: 'after' } // Return the updated document
            );

            if (!updatedBlogPost.value) {
                return res.status(404).json({ error: 'Blog post not found' });
            }

            res.status(200).json(updatedBlogPost.value);
        } catch (error) {
            console.error('Error updating like count:', error);
            res.status(500).json({ error: 'Internal Server Error', details: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
