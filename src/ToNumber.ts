import { True, compile, evaluate, prettyPrint } from "./interpreter";

import {
  LambdaExpression,
  isAbstraction,
  Abstraction,
  isApplication,
  Application,
} from "./types";

/**
 * Converts a Church numeral to a JavaScript number.
 *
 * @param churchNumeral The lambda expression representing the Church numeral.
 * @returns The equivalent JavaScript number.
 */
export function ToNumber(churchNumeral: Abstraction): number {
  const fAbstraction = churchNumeral.body as Abstraction;
  let currentExpression: LambdaExpression = fAbstraction.body;
  let count = 0;

  while (isApplication(currentExpression)) {
    count++;
    currentExpression = currentExpression.right;
  }

  return count;
}

/**
 * Converts a lambda expression to a boolean.
 *
 * @param expr The lambda expression representing a Church boolean.
 * @returns True if the expression is equivalent to the Church 'True'.
 */
export function ToBool(expr: LambdaExpression): boolean {
  const trueExpr = compile(True);
  const evaluatedExpr = evaluate(expr);
  return prettyPrint(evaluatedExpr) === prettyPrint(trueExpr);
}
