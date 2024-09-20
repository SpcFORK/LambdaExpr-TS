"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToNumber = ToNumber;
exports.ToBool = ToBool;
const interpreter_1 = require("./interpreter");
const types_1 = require("./types");
/**
 * Converts a Church numeral to a JavaScript number.
 *
 * @param churchNumeral The lambda expression representing the Church numeral.
 * @returns The equivalent JavaScript number.
 */
function ToNumber(churchNumeral) {
    const fAbstraction = churchNumeral.body;
    let currentExpression = fAbstraction.body;
    let count = 0;
    while ((0, types_1.isApplication)(currentExpression)) {
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
function ToBool(expr) {
    const trueExpr = (0, interpreter_1.parse)(interpreter_1.True);
    const evaluatedExpr = (0, interpreter_1.evaluate)(expr);
    return (0, interpreter_1.prettyPrint)(evaluatedExpr) === (0, interpreter_1.prettyPrint)(trueExpr);
}
