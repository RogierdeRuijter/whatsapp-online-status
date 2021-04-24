import { HandlerFunc, Context } from "https://deno.land/x/abc@v1.3.1/mod.ts";
import db from './db.ts';
import { ErrorHandler } from "./middlewares.ts"
import { setCookie } from "https://deno.land/std/http/cookie.ts";

interface Body {
  visitorId: string;
}

interface Signature {
   timestamp: string;
   visitorId: string;
}

export const signPetition: HandlerFunc = async (c: Context): Promise<any> => {
  try {
    if (c.request.headers.get("content-type") !== "application/json") {
      throw new ErrorHandler("Invalid body", 422);
    } 
    const body: Body = await (c.body) as Body;
  
    if (!Object.keys(body as object).length) {
      throw new ErrorHandler("Request body can not be empty!", 400);
    }

    const { visitorId } = body;

    if (!visitorId) {
      throw new ErrorHandler("VisitorId should be defined", 400);
    }

    const database = db.getDatebase("whatsapp-petition");

    const signatures = database.collection<Signature>("signatures");

    // Not worried about scallability here since the db handles this query
    const signatuesWithCurrentFingerprint = await signatures.find(
      { visitorId: { $eq: visitorId } }, { noCursorTimeout:false } as any
    ).toArray();

    if (signatuesWithCurrentFingerprint.length > 0) {
      // TODO: set cookie signed here
      throw new ErrorHandler("User has already signed the petition", 403)
    }

    await signatures.insertOne({
      timestamp: new Date(),
      visitorId
    });
    
    const date = new Date();
    setCookie(c.response, {
                name: "signed", 
                value: 'true',
                expires: new Date(date.setFullYear(date.getFullYear() + 1)),
                domain: 'localhost',
                secure: false,
                sameSite: 'Strict',
                path: '/'
              });

    return c.json('Succesfull', 201);
  } catch (error) {
    throw new ErrorHandler(error.message, error.status || 500);
  }
};
