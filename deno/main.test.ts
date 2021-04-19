// import { add } from "./add.ts";
import { Rhum } from "https://deno.land/x/rhum@v1.1.2/mod.ts";

// Create a test plan for our `add.ts` file.
Rhum.testPlan("main.ts", () => {

  // Add a test suite for our `add()` function
  Rhum.testSuite("signPetition()", () => {

    // Add a test case, this will be used in `Deno.test()` under-the-hood.
    Rhum.testCase("it should add two numbers", () => {
    //   const result = add(1, 2);

    //   Rhum.asserts.assertEquals(result, 3);
    });
  });
});

Rhum.run();
