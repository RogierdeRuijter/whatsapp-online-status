import { HandlerFunc, Context } from "https://deno.land/x/abc@v1.3.1/mod.ts";
import db from './db.ts';
import { ErrorHandler } from "./middlewares.ts"

interface Signature {
   timestamp: string;
}

export const signPetition: HandlerFunc = async (c: Context) => {
  try {
    // if (c.request.headers.get("content-type") !== "application/json") {
    //   throw new ErrorHandler("Invalid body", 422);
    // } 
    // const body: Contact = await (c.body) as Contact;
  
    // if (!Object.keys(body as object).length) {
    //   throw new ErrorHandler("Request body can not be empty!", 400);
    // }

  // const { name, age, email, address } = body;

  const database = db.client.database("whatsapp-petition");

  const signatures = database.collection<Signature>("signatures");

  const insertedSignature = await signatures.insertOne({
    timestamp: new Date()
  });

  return c.json(insertedSignature, 201);
  } catch (error) {
    throw new ErrorHandler(error.message, error.status || 500);
  }
};
