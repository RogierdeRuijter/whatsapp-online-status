import { Application } from "https://deno.land/x/abc@v1.3.1/mod.ts";
import "https://deno.land/x/dotenv/load.ts";
import { ErrorMiddleware, LogMiddleware } from "./middlewares.ts";
import { createContact } from "./controllers.ts";

const app = new Application();

app
  .use(LogMiddleware)
  .use(ErrorMiddleware);

app
  .post("/contact", createContact)
  .start({ port: 5000 });

console.log(`server listening on http://localhost:5000`);
