"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.betaReduction = betaReduction;
const substitute_1 = require("./substitute");
function betaReduction(abstraction, argument) {
    return (0, substitute_1.substitute)(abstraction.body, abstraction.parameter, argument);
}
