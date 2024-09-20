import * as readline from "readline";
import { evaluate, interpret, prettyPrint } from "./interpreter";
import { translateToJsValue } from "./translateToJsValue";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("Lambda Calculus Interpreter");
console.log('Enter a lambda expression or type "exit" to quit.');

function promptUser() {
  rl.question("> ", (input) => {
    if (input.toLowerCase() === "exit") {
      rl.close();
      return;
    }

    try {
      const result = interpret(input);

      const evalCode = prettyPrint(evaluate(result));
      console.log("Evaluated Code:");
      console.log(evalCode);
      console.log();

      const value = translateToJsValue(result);
      console.log("Value:");
      console.log(value);
      console.log();
    } catch (error) {
      console.error("Error:", (error as Error).message);
    }

    promptUser();
  });
}

promptUser();
