import { Application } from "https://deno.land/x/abc@v1.3.1/mod.ts";
import "https://deno.land/x/dotenv/load.ts";
import { ErrorMiddleware, LogMiddleware } from "./middlewares.ts";
import { signPetition } from "./controllers.ts";
import db from "./db.ts";

async function main() {
  const app = new Application();
  
  await db.connect();
  
  app
  .use(LogMiddleware)
  .use(ErrorMiddleware);

  app
    .post("/sign", signPetition)
    .start({ port: 5000 });
    
  console.log(`server listening on http://localhost:5000`);
}

main();
