import {
  LambdaExpression,
  Variable,
  Abstraction,
  Application,
  ChurchNumeral,
  ChurchBoolean,
  Operator,
  operators,
  lower_ops,
} from "../types";

import * as church from "./churchEncodings";

export function compile(input: string): LambdaExpression {
  const tokens = tokenize(input);
  const [result, remaining] = parseExpression(tokens);

  if (remaining.length > 0) {
    throw new Error(`Unexpected tokens: ${remaining.join(" ")}`);
  }

  return result;
}

function tokenize(input: string): string[] {
  return input
    .replace(/\s+/g, " , ")
    .replace(/[()λ$\.]/g, " $& ")
    .split(/\s+/)
    .filter((token) => token.length > 0);
}

function parseExpression(tokens: string[]): [LambdaExpression, string[]] {
  return parseApplication(tokens);
}

function parseApplication(tokens: string[]): [LambdaExpression, string[]] {
  let [left, remaining] = parseAtom(tokens);

  while (remaining.length > 0) {
    if (remaining[0] === ")") break;
    if (remaining[0] === "," || remaining[0] === "") {
      remaining.shift();
      continue;
    }
    const [right, newRemaining] = parseAtom(remaining);
    left = new Application(left, right);
    remaining = newRemaining;
  }

  return [left, remaining];
}

function parseAtom(tokens: string[]): [LambdaExpression, string[]] {
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
    if (lower_ops.includes(lower)) {
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

  throw new Error(
    `Unexpected token: ${tokens[0]}. Expected a variable, number, boolean, operator, or lambda abstraction.`,
  );
}

function parseParenthesizedExpression(
  tokens: string[],
): [LambdaExpression, string[]] {
  const [expr, remaining] = parseExpression(tokens.slice(1));
  if (remaining.length === 0 || remaining[0] !== ")") {
    throw new Error("Missing closing parenthesis");
  }
  return [expr, remaining.slice(1)];
}

function parseSpace(tokens: string[]): [LambdaExpression, string[]] {
  if (tokens.length <= 1) throw new Error("Unexpected end of input");
  return [" ", tokens.slice(1)];
}

function isVariable(token: string): boolean {
  return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(token);
}

function parseVariable(tokens: string[]): [Variable, string[]] {
  return [tokens[0] as Variable, tokens.slice(1)];
}

function isNumber(token: string): boolean {
  return /^\d+$/.test(token);
}

function parseNumber(tokens: string[]): [ChurchNumeral, string[]] {
  return [new ChurchNumeral(parseInt(tokens[0], 10)), tokens.slice(1)];
}

function isBoolean(token: string): boolean {
  return ["true", "false"].includes(token.toLowerCase());
}

function parseBoolean(tokens: string[]): [ChurchBoolean, string[]] {
  return [
    new ChurchBoolean(tokens[0].toLowerCase() === "true"),
    tokens.slice(1),
  ];
}

function parseOperator(tokens: string[]): [Operator, string[]] {
  let token = tokens[0].toLowerCase();
  let code: (typeof church)[keyof typeof church] = <any>token;
  switch (token) {
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
    case "pred":
      code = church.Pred;
      break;
    case "succ":
      code = church.Succ;
      break;
    case "and":
      code = church.And;
      break;
    case "or":
      code = church.Or;
      break;
    case "not":
      code = church.Not;
      break;
    case "lessthan":
    case "<":
      code = church.LessThan;
      break;
    case "greaterthan":
    case ">":
      code = church.GreaterThan;
      break;
    case "equals":
    case "==":
      code = church.Equals;
      break;
    case "notequals":
    case "!=":
      code = church.NotEquals;
      break;
  }
  return [new Operator(compile(<string>code)), tokens.slice(1)];
}

function parseAbstraction(tokens: string[]): [Abstraction, string[]] {
  if (tokens.length < 3) {
    throw new Error("Invalid abstraction syntax: not enough tokens");
  }

  // const abstractionToken = tokens[0];
  const parameter = tokens[1];

  if (tokens[2] !== ".")
    throw new Error("Invalid abstraction syntax: missing dot");

  const [body, remaining] = parseExpression(tokens.slice(3));

  return [new Abstraction(parameter, body), remaining];
}
