import { MongoClient } from "mongodb";

async function connectDB() {
  const connectionUri: string = process.env.MONGO_URI || "";
  const client = new MongoClient(connectionUri);
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB server");

    const database = client.db("sample_mflix");

    const databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  } finally {
    await client.close();
  }
}

connectDB().catch(console.error);

export default connectDB;
