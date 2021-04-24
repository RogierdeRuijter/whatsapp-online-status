import { Application} from "https://deno.land/x/abc/mod.ts";
import "https://deno.land/x/dotenv/load.ts";
import { ErrorMiddleware, LogMiddleware } from "./middlewares.ts";
import { signPetition } from "./controllers.ts";
import db from "./db.ts";
import { abcCors } from "https://deno.land/x/cors/mod.ts";
import { WebSocketClient, WebSocketServer } from "https://deno.land/x/websocket@v0.1.1/mod.ts";
import { Signature } from './controllers.ts';

const app = new Application();

await db.connect();

app.use(abcCors({
  origin: "http://localhost:5000",
  credentials: true
}))

app
  .use(LogMiddleware)
  .use(ErrorMiddleware);

app
  .options("/sign", (c: any) => c, abcCors({
    origin: "http://localhost:5000",
    credentials: true
  }))
  .post("/sign", signPetition)
  .start({ port: 3000 });
  
console.log('Server listening on http://localhost:3000');

const database = db.getDatebase("whatsapp-petition");
const signatures = database.collection<Signature>("signatures");

let totalAmountOfSignatures: number;
setInterval(async() => {
  totalAmountOfSignatures = await signatures.count({});
}, 5000); 

const wss = new WebSocketServer(8080);
wss.on("connection", async (ws: WebSocketClient) => {
  const interval = setInterval(async() => {
    if(!ws.isClosed) {
      ws.send(
        JSON.stringify({count: totalAmountOfSignatures})
      );
    } else {
      clearInterval(interval);
    }
  }, 5000); 
  
  ws.on("message", function (message: string) {
    ws.send(message)
  });
});

console.log('Websocket server listening on http://localhost:8080');
