"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alphaConversion = alphaConversion;
const types_1 = require("../types");
const substitute_1 = require("./substitute");
let uniqueCounter = 0;
function alphaConversion(expr) {
    const newParam = generateUniqueVariable(expr.parameter);
    return new types_1.Abstraction(newParam, (0, substitute_1.substitute)(expr.body, expr.parameter, newParam));
}
function generateUniqueVariable(base) {
    return `${base}_${uniqueCounter++}`;
}
