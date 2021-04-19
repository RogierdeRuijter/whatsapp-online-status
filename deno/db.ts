import { MongoClient } from "https://deno.land/x/mongo@v0.22.0/mod.ts";

class DB {
  public client: MongoClient;
  constructor(public dbName: string, public url: string) {
    this.dbName = dbName;
    this.url = url;
    this.client = {} as MongoClient;
  }

  async connect() {
    const client = new MongoClient();
    await client.connect(this.url);
    this.client = client;
  }

  get getDatabase() {
    return this.client.database(this.dbName);
  }
}

const dbName = Deno.env.get("DB_NAME") || "contactdb";
const dbHostUrl = Deno.env.get("DB_HOST_URL") || "mongodb://localhost:27017";
// console.log(dbName, dbHostUrl)

const db = new DB(dbName, dbHostUrl);
await db.connect();

export default db;
