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

function containsSpace(str: string): boolean {
  return str.includes(" ");
}

function containsBrack(str: string): boolean {
  return str.includes("(") || str.includes(")");
}

function handleShouldWrap(str: string): string {
  switch (true) {
    case containsSpace(str) && !containsBrack(str):
      return `(${str})`;
    default:
      return str;
  }
}

function handleFormat(str: string): string {
  str = handleShouldWrap(str);
  return str;
}

export function prettyPrint(expr: LambdaExpression): string {
  switch (true) {
    case isOperator(expr):
      return prettyPrint(expr.value);

    case isVariable(expr):
      return expr;

    case isAbstraction(expr):
      let params = `${expr.parameter}`;
      let body = expr.body;

      console.log(expr);

      while (isAbstraction(body)) {
        params += `.${handleFormat("λ" + body.parameter)}`;
        body = body.body;
      }

      return `(λ${params}.${prettyPrint(body)})`;

    case isApplication(expr):
      let left = prettyPrint(expr.left);
      let right = prettyPrint(expr.right);
      return `(${left} ${right})`;

    case isChurchNumeral(expr):
      return core.Numeral(expr.value);

    case isChurchBoolean(expr):
      return expr.value ? core.True : core.False;

    default:
      throw new Error("Invalid LambdaExpression");
  }
}
