"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugModule = void 0;
const base_types_1 = require("../../../core/jsonrpc/types/base-types");
const debugTraceTransaction_1 = require("../../../core/jsonrpc/types/input/debugTraceTransaction");
const validation_1 = require("../../../core/jsonrpc/types/input/validation");
const errors_1 = require("../../../core/providers/errors");
/* eslint-disable @nomicfoundation/hardhat-internal-rules/only-hardhat-error */
class DebugModule {
    constructor(_node) {
        this._node = _node;
    }
    async processRequest(method, params = []) {
        switch (method) {
            case "debug_traceTransaction":
                return this._traceTransactionAction(...this._traceTransactionParams(params));
        }
        throw new errors_1.MethodNotFoundError(`Method ${method} not found`);
    }
    // debug_traceTransaction
    _traceTransactionParams(params) {
        const validatedParams = (0, validation_1.validateParams)(params, base_types_1.rpcHash, debugTraceTransaction_1.rpcDebugTracingConfig);
        this._validateTracerParam(validatedParams[1]);
        return validatedParams;
    }
    _validateTracerParam(config) {
        if (config?.tracer !== undefined) {
            throw new errors_1.InvalidArgumentsError("Hardhat currently only supports the default tracer, so no tracer parameter should be passed.");
        }
    }
    async _traceTransactionAction(hash, config) {
        return this._node.traceTransaction(hash, config);
    }
}
exports.DebugModule = DebugModule;
//# sourceMappingURL=debug.js.map