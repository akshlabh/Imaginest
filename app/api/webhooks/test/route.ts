import { NextResponse } from "next/server";
import { MongoClient, ServerApiVersion } from "mongodb";

// MongoDB connection URI - Replace the placeholder with actual credentials
const uri = "mongodb+srv://admin:admin@cluster0.xcbszqs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient instance with the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function POST(req: Request) {
  try {
    // Connect the client to the server
    await client.connect();
    
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });

    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // Optionally, you can retrieve data or perform operations here.
    // For example, inserting a dummy record:
    const db = client.db("Imaginest"); // Replace with your database name
    const collection = db.collection("test"); // Replace with your collection name
    const result = await collection.insertOne({ message: "Connection successful!" });

    console.log("Document inserted:", result);

    // Return a successful response to the client
    return NextResponse.json({ message: "Successfully connected to MongoDB!" });
  } catch (error) {
    console.error("Error connecting to MongoDB:ghghgh", error);

    // Return an error response
    return NextResponse.json({ error: "Error connecting to MongoDB", details: error }, { status: 500 });
  } finally {
    // Ensure the client is closed after the operation
    await client.close();
  }
}
