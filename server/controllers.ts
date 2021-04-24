import { HandlerFunc, Context } from "https://deno.land/x/abc@v1.3.1/mod.ts";
import db from './db.ts';
import { ErrorHandler } from "./middlewares.ts"

interface Body {
  visitorId: string;
}

interface Signature {
   timestamp: string;
   visitorId: string;
}

export const signPetition: HandlerFunc = async (c: Context): Promise<any> => {
  try {
    // TODO: fix content type bug
    console.log(c.request.headers);
    if (c.request.headers.get("content-type") !== "application/json") {
      throw new ErrorHandler("Invalid body", 422);
    } 
    const body: Body = await (c.body) as Body;

    console.log(body);
  
    if (!Object.keys(body as object).length) {
      throw new ErrorHandler("Request body can not be empty!", 400);
    }

    const { visitorId } = body;

    console.log(visitorId)

    if (!visitorId) {
      throw new ErrorHandler("VisitorId should be defined", 400);
    }

    const database = db.getDatebase("whatsapp-petition");

    const signatures = database.collection<Signature>("signatures");

    const insertedSignature = await signatures.insertOne({
      timestamp: new Date(),
      visitorId
    });

    return c.json(insertedSignature, 201);
  } catch (error) {
    throw new ErrorHandler(error.message, error.status || 500);
  }
};
