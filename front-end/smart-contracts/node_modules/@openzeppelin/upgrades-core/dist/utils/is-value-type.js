"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValueType = void 0;
function isValueType(type) {
    return type.args === undefined || ['t_contract', 't_enum', 't_userDefinedValueType'].includes(type.head);
}
exports.isValueType = isValueType;
//# sourceMappingURL=is-value-type.js.map