import validator from "validator";
import { connectToDatabase, COLLECTIONS } from '../db.js';
import { postHandler, Errors } from "../utils/index.js";

const handler = async (req, res) => {
    const { email } = req.body;

    if (!email || !validator.isEmail(email)) {
        throw Errors.badRequest("Invalid email format");
    }

    const { db } = await connectToDatabase();

    const existingEmail = await db
        .collection(COLLECTIONS.EMAIL_SUBSCRIPTIONS)
        .findOne({ email });

    if (existingEmail) {
        throw Errors.conflict('Email already subscribed', { email });
    }

    const now = new Date();
    const newSubscriber = {
        email,
        createdAt: now,
        updatedAt: now,
        status: "subscribed", // Track the subscription status
    };

    const result = await db.collection(COLLECTIONS.EMAIL_SUBSCRIPTIONS).insertOne(newSubscriber);

    // Return a success response
    res.status(201).json({
        message: "Successfully subscribed",
        subscriber: {
            id: result.insertedId,
            email: newSubscriber.email,
            createdAt: newSubscriber.createdAt,
            status: newSubscriber.status,
        },
    });
}

export default postHandler(handler);
