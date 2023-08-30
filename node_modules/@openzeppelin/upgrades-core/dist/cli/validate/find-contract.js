"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findContract = exports.ReferenceContractNotFound = void 0;
const error_1 = require("./error");
class ReferenceContractNotFound extends Error {
    constructor(reference, origin) {
        const msg = origin !== undefined
            ? `Could not find contract ${reference} referenced in ${origin}.`
            : `Could not find contract ${reference}.`;
        super(msg);
        this.reference = reference;
        this.origin = origin;
    }
}
exports.ReferenceContractNotFound = ReferenceContractNotFound;
function findContract(contractName, origin, allContracts) {
    const foundContracts = allContracts.filter(c => c.fullyQualifiedName === contractName || c.name === contractName);
    if (foundContracts.length > 1) {
        const msg = origin !== undefined
            ? `Found multiple contracts with name ${contractName} referenced in ${origin.fullyQualifiedName}.`
            : `Found multiple contracts with name ${contractName}.`;
        throw new error_1.ValidateCommandError(msg, () => `This may be caused by old copies of build info files. Clean and recompile your project, then run the command again with the updated files.`);
    }
    else if (foundContracts.length === 1) {
        return foundContracts[0];
    }
    else {
        throw new ReferenceContractNotFound(contractName, origin?.fullyQualifiedName);
    }
}
exports.findContract = findContract;
//# sourceMappingURL=find-contract.js.map