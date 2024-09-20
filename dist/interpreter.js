"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interpret = interpret;
exports.translateToJsValue = translateToJsValue;
exports.prettyPrint = prettyPrint;
const types_1 = require("./types");
const core = __importStar(require("./interpreter/"));
const ToNumber_1 = require("./ToNumber");
__exportStar(require("./interpreter/"), exports);
__exportStar(require("./types"), exports);
function interpret(input) {
    const parsed = core.parse(input);
    const result = core.evaluate(parsed);
    return result;
}
function translateToJsValue(value) {
    console.debug(value);
    if ((0, types_1.isChurchNumeral)(value))
        return (0, ToNumber_1.ToNumber)(value);
    if ((0, types_1.isChurchBoolean)(value))
        return (0, ToNumber_1.ToBool)(value);
    if ((0, types_1.isAbstraction)(value)) {
        return new types_1.Abstraction(value.parameter, translateToJsValue(value.body));
    }
    if ((0, types_1.isApplication)(value)) {
        return new types_1.Application(translateToJsValue(value.left), translateToJsValue(value.right));
    }
    return value;
}
function containsSpace(str) {
    return str.includes(" ");
}
function containsBrack(str) {
    return str.includes("(") || str.includes(")");
}
function handleShouldWrap(str) {
    switch (true) {
        case containsSpace(str) && !containsBrack(str):
            return `(${str})`;
        default:
            return str;
    }
}
function handleFormat(str) {
    str = handleShouldWrap(str);
    return str;
}
function prettyPrint(expr) {
    switch (true) {
        case (0, types_1.isVariable)(expr):
            return expr;
        case (0, types_1.isAbstraction)(expr):
            let params = `${expr.parameter}`;
            let body = expr.body;
            console.log(expr);
            while ((0, types_1.isAbstraction)(body)) {
                params += `.${handleFormat("λ" + body.parameter)}`;
                body = body.body;
            }
            return `(λ${params}.${prettyPrint(body)})`;
        case (0, types_1.isApplication)(expr):
            let left = prettyPrint(expr.left);
            let right = prettyPrint(expr.right);
            return `(${left} ${right})`;
        case (0, types_1.isChurchNumeral)(expr):
            return core.Numeral(expr.value);
        case (0, types_1.isChurchBoolean)(expr):
            return expr.value ? core.True : core.False;
        case (0, types_1.isOperator)(expr):
            return expr.value;
        default:
            throw new Error("Invalid LambdaExpression");
    }
}
