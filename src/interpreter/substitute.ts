import {
  LambdaExpression,
  Abstraction,
  Application,
  Variable,
  isVariable,
  isAbstraction,
  isApplication,
  isChurchNumeral,
  isChurchBoolean,
  isOperator,
} from "../types";

export function substitute(
  expr: LambdaExpression,
  variable: Variable,
  replacement: LambdaExpression,
): LambdaExpression {
  if (isVariable(expr)) {
    return handleVar(expr, variable, replacement);
  }
  if (isAbstraction(expr)) {
    return handleAbs(expr, variable, replacement);
  }
  if (isApplication(expr)) {
    return handleApp(expr, variable, replacement);
  }
  if (isChurchNumeral(expr) || isChurchBoolean(expr) || isOperator(expr)) {
    return expr;
  }
  throw new Error("Invalid LambdaExpression");
}

function handleApp(
  expr: Application,
  variable: string,
  replacement: LambdaExpression,
): LambdaExpression {
  const left = substitute(expr.left, variable, replacement);
  const right = substitute(expr.right, variable, replacement);
  return new Application(left, right);
}

function handleAbs(
  expr: Abstraction,
  variable: string,
  replacement: LambdaExpression,
): LambdaExpression {
  if (expr.parameter === variable) {
    return expr;
  }
  const body = substitute(expr.body, variable, replacement);
  return new Abstraction(expr.parameter, body);
}

function handleVar(
  expr: string,
  variable: string,
  replacement: LambdaExpression,
): LambdaExpression {
  return expr === variable ? replacement : expr;
}
