import { connectToDatabase } from '../db.js';
import { getHandler } from "../utils/methodHandler.js";

const handler = async function handler(req, res) {
    const {db} = await connectToDatabase();

    const documents = await db
        .collection('cuidador_front_collection')
        .find({})
        .project({
            slug: 1,
            id: 1,
            date: 1,
            image: 1,
            title: 1,
            description: 1,
            shapePath: 1,
            viewCount: 1,
            likeCount: 1,
        })
        .toArray();

    res.status(200).json({documents});
};

export default getHandler(handler)
