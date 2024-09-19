import { LambdaExpression, Abstraction } from './types';
import { parse, interpret, prettyPrint } from './interpreter';

// Church encoding for natural numbers
export function churchNumeral(n: number): string {
  return `λf.λx.${Array(n).fill('f').join(' ')}x`;
}

// Addition of Church numerals
export const churchAdd = 'λm.λn.λf.λx.m f (n f x)';

// Multiplication of Church numerals
export const churchMult = 'λm.λn.λf.m (n f)';

// Predecessor of Church numerals
export const churchPred = 'λn.λf.λx.n (λg.λh.h (g f)) (λu.x) (λu.u)';

// Subtraction of Church numerals
export const churchSub = 'λm.λn.n churchPred m';

// Helper function to convert Church numeral to JavaScript number
export function churchToNumber(expr: LambdaExpression): number {
  if (typeof expr === 'string') {
    throw new Error('Invalid Church numeral');
  }

  const applied = interpret(`(${prettyPrint(expr)} (λx.x+1) 0)`);
  return parseInt(prettyPrint(applied), 10);
}

// Boolean operations
export const churchTrue = 'λx.λy.x';
export const churchFalse = 'λx.λy.y';

export const churchAnd = 'λp.λq.p q p';
export const churchOr = 'λp.λq.p p q';
export const churchNot = 'λp.p churchFalse churchTrue';

// Helper function to convert Church boolean to JavaScript boolean
export function churchToBool(expr: LambdaExpression): boolean {
  const result = interpret(`(${prettyPrint(expr)} true false)`);
  return prettyPrint(result) === 'true';
}
