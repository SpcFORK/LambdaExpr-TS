import {
  LambdaExpression,
  Abstraction,
  isVariable,
  isAbstraction,
  isApplication,
  isChurchNumeral,
  isChurchBoolean,
  isOperator,
} from "./types";

import * as core from "./interpreter/";
export * from "./interpreter/";
export * from "./types";
export * from "./pretty";

export function interpret(input: string): LambdaExpression {
  const parsed = core.compile(input);
  const result = core.evaluate(parsed);
  return result;
}
