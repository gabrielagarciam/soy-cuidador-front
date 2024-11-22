import { connectToDatabase } from '../db.js';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            // Get the slug from the query string
            const { slug } = req.query;

            if (!slug) {
                return res.status(400).json({ error: 'Slug is required' });
            }

            // Connect to the database
            const { db } = await connectToDatabase();

            // Query the `blogPosts` collection for a document with the matching slug
            const blogPost = await db.collection('cuidador_front_collection').findOneAndUpdate(
                { slug }, // Query filter
                { $inc: { viewCount: 1 } }, // Increment viewCount by 1
                { returnDocument: 'after' } // Return the updated document
            );

            if (!blogPost) {
                return res.status(404).json({ error: 'Blog post not found' });
            }

            res.status(200).json(blogPost);
        } catch (error) {
            console.error('Error fetching blog post:', error);
            res.status(500).json({ error: 'Internal Server Error', details: error.message });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
