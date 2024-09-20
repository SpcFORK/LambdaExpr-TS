"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluate = evaluate;
const types_1 = require("../types");
const alphaConversion_1 = require("./alphaConversion");
const betaReduction_1 = require("./betaReduction");
function evaluate(expr) {
    if ((0, types_1.isVariable)(expr) ||
        (0, types_1.isChurchNumeral)(expr) ||
        (0, types_1.isChurchBoolean)(expr) ||
        (0, types_1.isOperator)(expr)) {
        return expr;
    }
    else if ((0, types_1.isAbstraction)(expr)) {
        return { ...expr, body: evaluate(expr.body) };
    }
    else if ((0, types_1.isApplication)(expr)) {
        const evaledLeft = evaluate(expr.left);
        const evaledRight = evaluate(expr.right);
        if ((0, types_1.isAbstraction)(evaledLeft)) {
            const alphaConverted = (0, alphaConversion_1.alphaConversion)(evaledLeft);
            return evaluate((0, betaReduction_1.betaReduction)(alphaConverted, evaledRight));
        }
        return new types_1.Application(evaledLeft, evaledRight);
    }
    throw new Error("Invalid LambdaExpression");
}
