"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withCliDefaults = exports.findSpecifiedContracts = exports.validateUpgradeSafety = void 0;
const __1 = require("../..");
const build_info_file_1 = require("./build-info-file");
const contract_report_1 = require("./contract-report");
const find_contract_1 = require("./find-contract");
const project_report_1 = require("./project-report");
const validations_1 = require("./validations");
/**
 * Validates the upgrade safety of all contracts in the build info dir's build info files.
 * Only contracts that are detected as upgradeable will be validated.
 *
 * @param buildInfoDir Absolute path of build info directory, or undefined to use the default Hardhat or Foundry build-info dir.
 * @param contract The name or fully qualified name of the contract to validate. If not specified, all upgradeable contracts in the build info directory will be validated.
 * @param reference The name or fully qualified name of the reference contract to use for storage layout comparisons. Can only be used along with `contract`. If not specified, uses the `@custom:oz-upgrades-from` annotation in the contract that is being validated.
 * @param opts Validation options, or undefined to use the default validation options.
 * @returns The project report.
 */
async function validateUpgradeSafety(buildInfoDir, contract, reference, opts = {}) {
    const allOpts = withCliDefaults(opts);
    const buildInfoFiles = await (0, build_info_file_1.getBuildInfoFiles)(buildInfoDir);
    const sourceContracts = (0, validations_1.validateBuildInfoContracts)(buildInfoFiles);
    const specifiedContracts = findSpecifiedContracts(sourceContracts, allOpts, contract, reference);
    const contractReports = (0, contract_report_1.getContractReports)(sourceContracts, allOpts, specifiedContracts);
    return (0, project_report_1.getProjectReport)(contractReports, specifiedContracts !== undefined);
}
exports.validateUpgradeSafety = validateUpgradeSafety;
function findSpecifiedContracts(sourceContracts, opts, contractName, referenceName) {
    if (contractName !== undefined) {
        return {
            contract: (0, find_contract_1.findContract)(contractName, undefined, sourceContracts),
            reference: referenceName !== undefined ? (0, find_contract_1.findContract)(referenceName, undefined, sourceContracts) : undefined,
        };
    }
    else if (referenceName !== undefined) {
        throw new Error(`The reference option can only be specified when the contract option is also specified.`);
    }
    else if (opts.requireReference) {
        throw new Error(`The requireReference option can only be specified when the contract option is also specified.`);
    }
    else {
        return undefined;
    }
}
exports.findSpecifiedContracts = findSpecifiedContracts;
function withCliDefaults(opts) {
    if (opts.requireReference && opts.unsafeSkipStorageCheck) {
        throw new Error(`The requireReference and unsafeSkipStorageCheck options cannot be used at the same time.`);
    }
    return {
        ...(0, __1.withValidationDefaults)(opts),
        requireReference: opts.requireReference ?? false,
    };
}
exports.withCliDefaults = withCliDefaults;
//# sourceMappingURL=validate-upgrade-safety.js.map