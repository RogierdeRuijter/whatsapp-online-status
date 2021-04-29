// import { add } from "./add.ts";
import { Rhum } from "https://deno.land/x/rhum@v1.1.9/mod.ts";
import { signPetition } from "./controllers.ts";
import { Stub, stub } from "https://deno.land/x/mock@v0.9.5/stub.ts";
import { Context, HandlerFunc } from "https://deno.land/x/abc@v1.3.1/mod.ts";
import db from "./db.ts";
import { DB } from "./db.ts";

// Create a test plan for our `add.ts` file.
Rhum.testPlan("controller.ts", () => {
  // Add a test suite for our `add()` function
  Rhum.testSuite("signPetition()", () => {
    // Add a test case, this will be used in `Deno.test()` under-the-hood.
    Rhum.testCase("it should add two numbers", () => {
      const action: Stub<DB> = stub(db, "database");

      const result = signPetition({} as Context);

      console.log(result);

      Rhum.asserts.assertEquals(result, 3);
    });
  });
});

Rhum.run();
