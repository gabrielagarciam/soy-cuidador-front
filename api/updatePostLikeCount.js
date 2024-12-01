import { connectToDatabase, COLLECTIONS } from '../db.js';
import { postHandler, Errors, isLocalhost } from "../utils/index.js";

const handler = async function handler(req, res) {
    const { slug, increment } = req.body;

    if (!slug || (increment !== 1 && increment !== -1)) {
        throw Errors.badRequest('Invalid request. Slug is required and increment must be 1 or -1.')
    }

    const { db } = await connectToDatabase();
    let updatedBlogPost;


    if (isLocalhost(req)) {
        console.info('Like count not updated since request is local');
        updatedBlogPost = await db.collection(COLLECTIONS.POSTS).findOne(
            { slug },
            { projection: { likeCount: 1 }}
        );
    } else {
        updatedBlogPost = await db.collection(COLLECTIONS.POSTS).findOneAndUpdate(
            { slug },
            { $inc: { likeCount: increment } },
            {
                returnDocument: 'after',
                projection: { likeCount: 1 }
            },
        );
    }

    if (!updatedBlogPost) {
        throw Errors.notFound('Blog post not found');
    }

    res.status(200).json(updatedBlogPost);
};

export default postHandler(handler)
