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
exports.parse = parse;
const types_1 = require("../types");
const church = __importStar(require("./churchEncodings"));
function parse(input) {
    const tokens = tokenize(input);
    const [result, remaining] = parseExpression(tokens);
    if (remaining.length > 0) {
        throw new Error(`Unexpected tokens: ${remaining.join(" ")}`);
    }
    return result;
}
function tokenize(input) {
    return input
        .replace(/\s+/g, " , ")
        .replace(/[()λ$\.]/g, " $& ")
        .split(/\s+/)
        .filter((token) => token.length > 0);
}
function parseExpression(tokens) {
    return parseApplication(tokens);
}
function parseApplication(tokens) {
    let [left, remaining] = parseAtom(tokens);
    while (remaining.length > 0) {
        if (remaining[0] === ")")
            break;
        if (remaining[0] === "," || remaining[0] === "") {
            remaining.shift();
            continue;
        }
        const [right, newRemaining] = parseAtom(remaining);
        left = new types_1.Application(left, right);
        remaining = newRemaining;
    }
    return [left, remaining];
}
function parseAtom(tokens) {
    if (tokens.length === 0) {
        throw new Error("Unexpected end of input");
    }
    if (tokens[0] === "(") {
        return parseParenthesizedExpression(tokens);
    }
    if (tokens[0] === ",") {
        return parseSpace(tokens);
    }
    if (["λ", "\\", "$"].includes(tokens[0])) {
        return parseAbstraction(tokens);
    }
    {
        let lower = tokens[0].toLowerCase();
        if (types_1.lower_ops.includes(lower)) {
            tokens.splice(0, 1, lower);
            return parseOperator(tokens);
        }
    }
    if (isNumber(tokens[0])) {
        return parseNumber(tokens);
    }
    if (isBoolean(tokens[0])) {
        return parseBoolean(tokens);
    }
    if (isVariable(tokens[0])) {
        return parseVariable(tokens);
    }
    throw new Error(`Unexpected token: ${tokens[0]}. Expected a variable, number, boolean, operator, or lambda abstraction.`);
}
function parseParenthesizedExpression(tokens) {
    const [expr, remaining] = parseExpression(tokens.slice(1));
    if (remaining.length === 0 || remaining[0] !== ")") {
        throw new Error("Missing closing parenthesis");
    }
    return [expr, remaining.slice(1)];
}
function parseSpace(tokens) {
    if (tokens.length <= 1)
        throw new Error("Unexpected end of input");
    return [" ", tokens.slice(1)];
}
function isVariable(token) {
    return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(token);
}
function parseVariable(tokens) {
    return [tokens[0], tokens.slice(1)];
}
function isNumber(token) {
    return /^\d+$/.test(token);
}
function parseNumber(tokens) {
    return [new types_1.ChurchNumeral(parseInt(tokens[0], 10)), tokens.slice(1)];
}
function isBoolean(token) {
    return ["true", "false"].includes(token.toLowerCase());
}
function parseBoolean(tokens) {
    return [
        new types_1.ChurchBoolean(tokens[0].toLowerCase() === "true"),
        tokens.slice(1),
    ];
}
function parseOperator(tokens) {
    let code = tokens[0];
    switch (tokens[0]) {
        case "add":
        case "+":
            code = church.Add;
            break;
        case "mult":
        case "*":
            code = church.Mult;
            break;
        case "sub":
        case "-":
            code = church.Sub;
            break;
    }
    return [new types_1.Operator(code), tokens.slice(1)];
}
function parseAbstraction(tokens) {
    if (tokens.length < 3) {
        throw new Error("Invalid abstraction syntax: not enough tokens");
    }
    // const abstractionToken = tokens[0];
    const parameter = tokens[1];
    if (tokens[2] !== ".")
        throw new Error("Invalid abstraction syntax: missing dot");
    const [body, remaining] = parseExpression(tokens.slice(3));
    return [new types_1.Abstraction(parameter, body), remaining];
}
