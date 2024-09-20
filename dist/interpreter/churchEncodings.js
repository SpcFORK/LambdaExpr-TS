"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Succ = exports.Equals = exports.LessThan = exports.Not = exports.Or = exports.And = exports.False = exports.True = exports.Sub = exports.Pred = exports.Mult = exports.Add = void 0;
exports.Numeral = Numeral;
/** Addition of Church numerals */
exports.Add = "(λm.λn.λf.λx.(m f (n f x)))";
/** Multiplication of Church numerals */
exports.Mult = "(λm.λn.λf.m (n f))";
/** Predecessor of Church numerals */
exports.Pred = `(λn.λf.λx.(n (λg.λh.h (g f)) (λu.x) (λu.u))`;
/** Subtraction of Church numerals */
exports.Sub = `(λm.λn.n ${exports.Pred} m)`;
/** Church boolean for True */
exports.True = "(λx.λy.x)";
/** Church boolean for False */
exports.False = "(λx.λy.y)";
/** Logical AND for Church booleans */
exports.And = "(λp.λq.(p q p))";
/** Logical OR for Church booleans */
exports.Or = "(λp.λq.(p p q))";
/** Logical NOT for Church booleans */
exports.Not = `(λp.(p ${exports.False} ${exports.True}))`;
/** Church numeral comparison for LessThan */
exports.LessThan = `(λm.λn.n (${exports.Pred} m) ${exports.False} ${exports.True})`;
/** Church numeral comparison for Equals */
exports.Equals = `(λm.λn.${exports.And} (${exports.LessThan} m n) (${exports.Not} (${exports.LessThan} m n)))`;
/** Successor function for Church numerals */
exports.Succ = "(λn.λf.λx.f (n f x))";
/**
 * Church encoding for natural numbers
 *
 * @param n The natural number to encode.
 * @returns The lambda expression representing the Church numeral.
 */
function Numeral(n) {
    return `(λf.λx.${"f(".repeat(n)}x${")".repeat(n)})`;
}
