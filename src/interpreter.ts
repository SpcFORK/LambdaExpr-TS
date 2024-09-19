import { LambdaExpression, Abstraction, Application, isVariable, isAbstraction, isApplication, isChurchNumeral, isChurchBoolean, isOperator } from './types';
import { parse } from './interpreter/parser';
import { evaluate } from './interpreter/evaluator';
import * as ChurchEncodings from './churchEncodings';

export { parse } from './interpreter/parser';
export { evaluate } from './interpreter/evaluator';

export function interpret(input: string): LambdaExpression {
  const parsed = parse(input);
  return evaluate(parsed);
}

export function prettyPrint(expr: LambdaExpression): string {
  if (isVariable(expr)) {
    return expr;
  } else if (isAbstraction(expr)) {
    return `(λ${expr.parameter}.${prettyPrint(expr.body)})`;
  } else if (isApplication(expr)) {
    return `(${prettyPrint(expr.left)} ${prettyPrint(expr.right)})`;
  } else if (isChurchNumeral(expr)) {
    return expr.value.toString();
  } else if (isChurchBoolean(expr)) {
    return expr.value.toString();
  } else if (isOperator(expr)) {
    return expr.value;
  }
  throw new Error('Invalid LambdaExpression');
}

// Export Church encoding functions
export const {
  churchNumeral,
  churchAdd,
  churchMult,
  churchPred,
  churchSub,
  churchToNumber,
  churchTrue,
  churchFalse,
  churchAnd,
  churchOr,
  churchNot,
  churchToBool,
  churchLessThan,
  churchEquals,
  churchSucc
} = ChurchEncodings;

// Alias exports for convenience
export const numeral = churchNumeral;
export const add = churchAdd;
export const mult = churchMult;
export const pred = churchPred;
export const sub = churchSub;
export const toNumber = churchToNumber;
export const True = churchTrue;
export const False = churchFalse;
export const And = churchAnd;
export const Or = churchOr;
export const Not = churchNot;
export const toBool = churchToBool;
