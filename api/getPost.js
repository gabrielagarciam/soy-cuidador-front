import { connectToDatabase, COLLECTIONS } from '../db.js';
import { getHandler } from "../utils/methodHandler.js";

const handler = async function handler(req, res) {
    const { slug } = req.query;

    if (!slug) {
        return res.status(400).json({ error: 'Slug is required' });
    }

    const { db } = await connectToDatabase();

    const blogPost = await db.collection(COLLECTIONS.POSTS).findOneAndUpdate(
        { slug },
        { $inc: { viewCount: 1 } },
        { returnDocument: 'after' }
    );

    if (!blogPost) {
        return res.status(404).json({ error: 'Blog post not found' });
    }

    res.status(200).json(blogPost);
}

export default getHandler(handler);
