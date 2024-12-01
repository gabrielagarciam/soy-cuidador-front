import { connectToDatabase, COLLECTIONS } from '../db.js';
import { getHandler, isLocalhost, Errors } from "../utils/index.js";

const handler = async function handler(req, res) {
    const { slug } = req.query;

    if (!slug) {
        throw Errors.badRequest('Slug is required')
    }

    const { db } = await connectToDatabase();
    let blogPost;

    if (isLocalhost(req)) {
        console.info('View count not updated since request is local');
        blogPost = await db.collection(COLLECTIONS.POSTS).findOne({ slug });
    } else {
        blogPost = await db.collection(COLLECTIONS.POSTS).findOneAndUpdate(
            { slug },
            { $inc: { viewCount: 1 } },
            { returnDocument: 'after' }
        );
    }

    if (!blogPost) {
        throw Errors.notFound('Blog post not found');
    }

    res.status(200).json(blogPost);
}

export default getHandler(handler);
