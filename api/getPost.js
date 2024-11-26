import { connectToDatabase, COLLECTIONS } from '../db.js';
import { getHandler } from "../utils/methodHandler.js";
import { Errors } from "../utils/errorHandler.js";

const handler = async function handler(req, res) {
    const { slug } = req.query;

    if (!slug) {
        throw Errors.badRequest('Slug is required')
    }

    const { db } = await connectToDatabase();

    const blogPost = await db.collection(COLLECTIONS.POSTS).findOneAndUpdate(
        { slug },
        { $inc: { viewCount: 1 } },
        { returnDocument: 'after' }
    );

    if (!blogPost) {
        throw Errors.notFound('Blog post not found');
    }

    res.status(200).json(blogPost);
}

export default getHandler(handler);
