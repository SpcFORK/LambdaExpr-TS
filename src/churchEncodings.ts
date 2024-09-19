import { LambdaExpression } from './types';
import { parse, interpret, prettyPrint } from './interpreter';

// Church encoding for natural numbers
export function churchNumeral(n: number): string {
  return `$f.$x.${Array(n).fill('f').join('(')}x${')'.repeat(n)}`;
}

// Addition of Church numerals
export const churchAdd = '($m.$n.$f.$x.m f (n f x))';

// Multiplication of Church numerals
export const churchMult = '($m.$n.$f.m (n f))';

// Predecessor of Church numerals
export const churchPred = '($n.$f.$x.n ($g.$h.h (g f)) ($u.x) ($u.u))';

// Subtraction of Church numerals
export const churchSub = '($m.$n.n churchPred m)';

// Helper function to convert Church numeral to JavaScript number
export function churchToNumber(expr: LambdaExpression): number {
  const churchNum = prettyPrint(expr);
  const evaluated = interpret(`(${churchNum} ($n.succ n) 0)`);
  return parseInt(prettyPrint(evaluated), 10);
}

// Boolean operations
export const churchTrue = '($x.$y.x)';
export const churchFalse = '($x.$y.y)';

export const churchAnd = '($p.$q.p q p)';
export const churchOr = '($p.$q.p p q)';
export const churchNot = '($p.p churchFalse churchTrue)';

// Helper function to convert Church boolean to JavaScript boolean
export function churchToBool(expr: LambdaExpression): boolean {
  const churchBool = prettyPrint(expr);
  const evaluated = interpret(`(${churchBool} true false)`);
  return prettyPrint(evaluated) === 'true';
}

// Comparison operations
export const churchLessThan = '($m.$n.n churchPred m churchTrue ($x.churchFalse))';
export const churchEquals = '($m.$n.churchAnd (churchLessThan m n) (churchLessThan n m))';

// Successor function
export const churchSucc = '($n.$f.$x.f (n f x))';
