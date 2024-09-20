import {
  LambdaExpression,
  isVariable,
  isAbstraction,
  isApplication,
  isChurchNumeral,
  isChurchBoolean,
  isOperator,
  Application,
  isResult,
  isPrimitive,
} from "../types";

import { alphaConversion } from "./alphaConversion";
import { betaReduction } from "./betaReduction";

export function evaluate(expr: LambdaExpression): LambdaExpression {
  if (
    isVariable(expr) ||
    isPrimitive(expr) ||
    isResult(expr)
  ) {
    return expr;
  } else if (isAbstraction(expr)) {
    return { ...expr, body: evaluate(expr.body) };
  } else if (isApplication(expr)) {
    const evaledLeft = evaluate(expr.left);
    const evaledRight = evaluate(expr.right);
    if (isAbstraction(evaledLeft)) {
      const alphaConverted = alphaConversion(evaledLeft);
      return evaluate(betaReduction(alphaConverted, evaledRight));
    }
    return new Application(evaledLeft, evaledRight);
  } else if (isOperator(expr)) {
    return evaluate(expr.value);
  }
  throw new Error("Invalid LambdaExpression");
}
