"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lower_ops = exports.operators = exports.Operator = exports.ChurchBoolean = exports.ChurchNumeral = exports.Application = exports.Abstraction = void 0;
exports.isVariable = isVariable;
exports.isAbstraction = isAbstraction;
exports.isApplication = isApplication;
exports.isChurchNumeral = isChurchNumeral;
exports.isChurchBoolean = isChurchBoolean;
exports.isOperator = isOperator;
class Abstraction {
    constructor(parameter, body) {
        this.parameter = parameter;
        this.body = body;
        this.type = "abstraction";
    }
}
exports.Abstraction = Abstraction;
class Application {
    constructor(left, right) {
        this.left = left;
        this.right = right;
        this.type = "application";
    }
}
exports.Application = Application;
class ChurchNumeral {
    constructor(value) {
        this.value = value;
        this.type = "churchNumeral";
    }
}
exports.ChurchNumeral = ChurchNumeral;
class ChurchBoolean {
    constructor(value) {
        this.value = value;
        this.type = "churchBoolean";
    }
}
exports.ChurchBoolean = ChurchBoolean;
class Operator {
    constructor(value) {
        this.value = value;
        this.type = "operator";
    }
}
exports.Operator = Operator;
function isVariable(expr) {
    return typeof expr === "string";
}
function isAbstraction(expr) {
    return typeof expr === "object" && expr.type === "abstraction";
}
function isApplication(expr) {
    return typeof expr === "object" && expr.type === "application";
}
function isChurchNumeral(expr) {
    return typeof expr === "object" && expr.type === "churchNumeral";
}
function isChurchBoolean(expr) {
    return typeof expr === "object" && expr.type === "churchBoolean";
}
function isOperator(expr) {
    return typeof expr === "object" && expr.type === "operator";
}
exports.operators = [
    "+",
    "*",
    "-",
    "=",
    "<",
    ">",
    "And",
    "Or",
    "Not",
    "Pred",
    "Succ",
    "Add",
    "ToNumber",
    "ToBool",
    "Mult",
    "Pred",
    "Sub",
];
exports.lower_ops = exports.operators.map((op) => op.toLowerCase());
