import { HandlerFunc, Context } from "https://deno.land/x/abc@v1.3.1/mod.ts";
import db from './db.ts';
import { ErrorHandler } from "./middlewares.ts"
import { setCookie } from "https://deno.land/std/http/cookie.ts";

// setInterval(async() => {
//     const database = db.getDatebase("whatsapp-petition");
//     const signatures = database.collection<Signature>("signatures");

//     console.log(await signatures.count({}));
// }, 5000); 

interface Body {
  visitorId: string;
}

export interface Signature {
   timestamp: string;
   visitorId: string;
}

const setSignedCookie = (context: Context) => {
  const date = new Date();
  setCookie(context.response, {
    name: "signed", 
    value: 'true',
    expires: new Date(date.setFullYear(date.getFullYear() + 1)),
    domain: 'localhost',
    secure: false,
    sameSite: 'Strict',
    path: '/'
  });
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
    // If this every gets slow indexing the database should be the solution to make it faster
    const signatuesWithCurrentFingerprint = await signatures.find(
      { visitorId: { $eq: visitorId } }, { noCursorTimeout:false } as any
    ).toArray();

    if (signatuesWithCurrentFingerprint.length > 0) {
      setSignedCookie(c);
      throw new ErrorHandler("User has already signed the petition", 403)
    }

    await signatures.insertOne({
      timestamp: new Date(),
      visitorId
    });
    
    setSignedCookie(c);

    return c.json('Succesfull', 201);
  } catch (error) {
    throw new ErrorHandler(error.message, error.status || 500);
  }
};
