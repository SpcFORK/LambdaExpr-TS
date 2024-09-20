import {
  LambdaExpression,
  Abstraction,
  Variable,
  isVariable,
  isAbstraction,
  isApplication,
  isChurchNumeral,
  isChurchBoolean,
  isOperator,
} from "../types";

import { substitute } from "./substitute";

let uniqueCounter = 0;

export function alphaConversion(expr: Abstraction): Abstraction {
  const newParam = generateUniqueVariable(expr.parameter);
  return new Abstraction(
    newParam,
    substitute(expr.body, expr.parameter, newParam),
  );
}

function generateUniqueVariable(base: string): string {
  return `${base}_${uniqueCounter++}`;
}
