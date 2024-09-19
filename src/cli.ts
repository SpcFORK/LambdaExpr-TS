import * as readline from 'readline';
import { interpret, prettyPrint } from './interpreter';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('Lambda Calculus Interpreter');
console.log('Enter a lambda expression or type "exit" to quit.');

function promptUser() {
  rl.question('> ', (input) => {
    if (input.toLowerCase() === 'exit') {
      rl.close();
      return;
    }

    try {
      const result = interpret(input);
      console.log('Result:', prettyPrint(result));
    } catch (error) {
      console.error('Error:', (error as Error).message);
    }

    promptUser();
  });
}

promptUser();
