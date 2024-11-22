import { MongoClient } from 'mongodb';

const MONGO_URI = process.env.MONGO_URI;

let client;
let db;

// Function to connect to MongoDB
export async function connectToDatabase() {
    if (!client) {
        // Initialize MongoDB client if not already connected
        client = await MongoClient.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    }

    if (!db) {
        // Use the database specified in the URI or explicitly define it
        db = client.db(); // You can use `client.db('<database_name>')` to specify the database
    }

    return { client, db };
}
