/** Church numeral operations */

/** Addition of Church numerals */
export const Add = "(λm.λn.λf.λx.(m f (n f x)))";

/** Multiplication of Church numerals */
export const Mult = "(λm.λn.λf.m (n f))";

/** Predecessor of Church numerals */
export const Pred = `(λn.λf.λx.(n (λg.λh.h (g f)) (λu.x) (λu.u))`;

/** Subtraction of Church numerals */
export const Sub = `(λm.λn.n ${Pred} m)`;

/** Church booleans */

/** Church boolean for True */
export const True = "(λx.λy.x)";

/** Church boolean for False */
export const False = "(λx.λy.y)";

/** Logical AND for Church booleans */
export const And = "(λp.λq.(p q p))";

/** Logical OR for Church booleans */
export const Or = "(λp.λq.(p p q))";

/** Logical NOT for Church booleans */
export const Not = `(λp.(p ${False} ${True}))`;

/** Church numeral comparisons */

/** LessThan for Church numerals */
export const LessThan = `(λm.λn.n (${Pred} m) ${False} ${True})`;

/** GreaterThan for Church numerals */
export const GreaterThan = `(λm.λn.n (${Pred} n) ${False} ${True})`;

/** Equals for Church numerals */
export const Equals = `(λm.λn.${And} (${LessThan} m n) (${Not} (${LessThan} m n)))`;

/** NotEquals for Church numerals */
export const NotEquals = `(λm.λn.${Not} (${Equals} m n))`;

/** Successor function for Church numerals */
export const Succ = "(λn.λf.λx.f (n f x))";

/**
 * Church encoding for natural numbers
 *
 * @param n The natural number to encode.
 * @returns The lambda expression representing the Church numeral.
 */
export function Numeral(n: number): string {
  return `(λf.λx.${"f(".repeat(n)}x${")".repeat(n)})`;
}
