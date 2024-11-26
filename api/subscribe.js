import validator from "validator";
import { connectToDatabase } from '../db.js';

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            // Extract the email from the request body
            const { email } = req.body;

            // Validate the email format using `validator`
            if (!email || !validator.isEmail(email)) {
                return res.status(400).json({ error: "Invalid email format" });
            }

            // Connect to the database
            const { db } = await connectToDatabase();

            // Check if the email already exists in the collection
            const existingEmail = await db
                .collection("emailSubscriptions")
                .findOne({ email });

            if (existingEmail) {
                return res.status(409).json({
                    error: "Email already subscribed",
                    email,
                });
            }

            // Insert the email with additional metadata
            const now = new Date();
            const newSubscriber = {
                email,
                createdAt: now,
                updatedAt: now,
                status: "subscribed", // Track the subscription status
            };

            const result = await db.collection("emailSubscriptions").insertOne(newSubscriber);

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
        } catch (error) {
            console.error("Error subscribing email:", error);
            res.status(500).json({
                error: "Internal Server Error",
                details: error.message,
            });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).json({ error: "Method Not Allowed" });
    }
}
