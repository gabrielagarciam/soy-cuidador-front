import { connectToDatabase } from '../db.js';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            // Hardcoded collection name
            const collectionName = 'cuidador_front_collection';

            // Hardcoded projection (fields to include in the response)
            const projection = {
                slug: 1,
                id: 1,
                date: 1,
                image: 1,
                title: 1,
                description: 1,
                shapePath: 1,
                viewCount: 1,
            };

            // Connect to MongoDB
            const { db } = await connectToDatabase();

            // Fetch documents with the defined projection
            const documents = await db
                .collection(collectionName)
                .find({})
                .project(projection)
                .toArray();

            res.status(200).json({ documents });
        } catch (error) {
            console.error('Error fetching blog posts:', error);
            res.status(500).json({ error: 'Internal Server Error', details: error.message });
        }
    } else {
        // Method not allowed
        res.setHeader('Allow', ['GET']);
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
