import { HandlerFunc, Context } from "https://deno.land/x/abc@v1.3.1/mod.ts";
import db from './db.ts';
import { ErrorHandler } from "./middlewares.ts"

const database = db.getDatabase;
const contacts = database.collection('contacts');

interface Contact {
    _id: {
    $oid: string;
    };
    name: string;
    age: number;
    email: string;
    address: string;
}

export const createContact: HandlerFunc = async (c: Context) => {
  try {
    if (c.request.headers.get("content-type") !== "application/json") {
    throw new ErrorHandler("Invalid body", 422);
  }
  const body: Contact = await (c.body) as Contact;
  
  if (!Object.keys(body as object).length) {
    throw new ErrorHandler("Request body can not be empty!", 400);
  }

  const { name, age, email, address } = body;

  const insertedContact = await contacts.insertOne({
    name,
    age,
    email,
    address
  });

  return c.json(insertedContact, 201);
  } catch (error) {
    throw new ErrorHandler(error.message, error.status || 500);
  }
};
