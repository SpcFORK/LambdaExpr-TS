"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.substitute = substitute;
const types_1 = require("../types");
function substitute(expr, variable, replacement) {
    if ((0, types_1.isVariable)(expr)) {
        return handleVar(expr, variable, replacement);
    }
    if ((0, types_1.isAbstraction)(expr)) {
        return handleAbs(expr, variable, replacement);
    }
    if ((0, types_1.isApplication)(expr)) {
        return handleApp(expr, variable, replacement);
    }
    if ((0, types_1.isChurchNumeral)(expr) || (0, types_1.isChurchBoolean)(expr) || (0, types_1.isOperator)(expr)) {
        return expr;
    }
    throw new Error("Invalid LambdaExpression");
}
function handleApp(expr, variable, replacement) {
    const left = substitute(expr.left, variable, replacement);
    const right = substitute(expr.right, variable, replacement);
    return new types_1.Application(left, right);
}
function handleAbs(expr, variable, replacement) {
    if (expr.parameter === variable) {
        return expr;
    }
    const body = substitute(expr.body, variable, replacement);
    return new types_1.Abstraction(expr.parameter, body);
}
function handleVar(expr, variable, replacement) {
    return expr === variable ? replacement : expr;
}
