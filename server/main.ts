import { Application} from "https://deno.land/x/abc/mod.ts";
import "https://deno.land/x/dotenv/load.ts";
import { ErrorMiddleware, LogMiddleware } from "./middlewares.ts";
import { signPetition } from "./controllers.ts";
import db from "./db.ts";
import { abcCors } from "https://deno.land/x/cors/mod.ts";

const app = new Application();

await db.connect();

app.use(abcCors({
  origin: "http://localhost:5000"
}))

app
  .use(LogMiddleware)
  .use(ErrorMiddleware);

app
  .options("/sign", (c: any) => c, abcCors())
  .post("/sign", signPetition)
  .start({ port: 3000 });
  
console.log(`server listening on http://localhost:3000`);
