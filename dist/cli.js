"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
const interpreter_1 = require("./interpreter");
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
            const result = (0, interpreter_1.interpret)(input);
            const code = (0, interpreter_1.prettyPrint)(result);
            console.log("Code:", code);
            const evalCode = (0, interpreter_1.prettyPrint)((0, interpreter_1.evaluate)(result));
            console.log("Evaluated Code:", evalCode);
            const value = (0, interpreter_1.translateToJsValue)(result);
            console.log("Value:", value);
        }
        catch (error) {
            console.error("Error:", error.message);
        }
        promptUser();
    });
}
promptUser();
