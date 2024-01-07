"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContractReports = exports.UpgradeableContractReport = void 0;
const chalk_1 = __importDefault(require("chalk"));
const debug_1 = __importDefault(require("../../utils/debug"));
const __1 = require("../..");
const upgradeability_assessment_1 = require("./upgradeability-assessment");
const indent_1 = require("../../utils/indent");
/**
 * Report for an upgradeable contract.
 * Contains the standalone report, and if there is a reference contract, the reference contract name and storage layout report.
 */
class UpgradeableContractReport {
    constructor(contract, reference, standaloneReport, storageLayoutReport) {
        this.contract = contract;
        this.reference = reference;
        this.standaloneReport = standaloneReport;
        this.storageLayoutReport = storageLayoutReport;
    }
    get ok() {
        return this.standaloneReport.ok && (this.storageLayoutReport === undefined || this.storageLayoutReport.ok);
    }
    /**
     * Explain any errors in the report.
     */
    explain(color = true) {
        const result = [];
        const chalk = new chalk_1.default.Instance({ level: color && chalk_1.default.supportsColor ? chalk_1.default.supportsColor.level : 0 });
        const icon = this.ok ? chalk.green('✔') : chalk.red('✘');
        if (this.reference === undefined) {
            result.push(` ${icon}  ${this.contract}`);
        }
        else {
            result.push(` ${icon}  ${this.contract} (upgrades from ${this.reference})`);
        }
        if (!this.standaloneReport.ok) {
            result.push((0, indent_1.indent)(this.standaloneReport.explain(color), 6));
        }
        if (this.storageLayoutReport !== undefined && !this.storageLayoutReport.ok) {
            result.push((0, indent_1.indent)(this.storageLayoutReport.explain(color), 6));
        }
        return result.join('\n\n');
    }
}
exports.UpgradeableContractReport = UpgradeableContractReport;
/**
 * Gets upgradeble contract reports for the upgradeable contracts in the given set of source contracts.
 * Only contracts that are detected as upgradeable will be included in the reports.
 * Reports include upgradeable contracts regardless of whether they pass or fail upgrade safety checks.
 *
 * @param sourceContracts The source contracts to check, which must include all contracts that are referenced by the given contracts. Can also include non-upgradeable contracts, which will be ignored.
 * @param opts The validation options.
 * @param specifiedContracts If provided, only the specified contract (upgrading from its reference contract) will be reported.
 * @returns The upgradeable contract reports.
 */
function getContractReports(sourceContracts, opts, specifiedContracts) {
    const upgradeableContractReports = [];
    const contractsToReport = specifiedContracts !== undefined ? [specifiedContracts.contract] : sourceContracts;
    for (const sourceContract of contractsToReport) {
        const upgradeabilityAssessment = (0, upgradeability_assessment_1.getUpgradeabilityAssessment)(sourceContract, sourceContracts, specifiedContracts?.reference);
        if (opts.requireReference && upgradeabilityAssessment.referenceContract === undefined) {
            throw new Error(`The contract ${sourceContract.fullyQualifiedName} does not specify what contract it upgrades from. Add the \`@custom:oz-upgrades-from <REFERENCE_CONTRACT>\` annotation to the contract, or include the reference contract name when running the validate command or function.`);
        }
        else if (specifiedContracts !== undefined || upgradeabilityAssessment.upgradeable) {
            const reference = upgradeabilityAssessment.referenceContract;
            const kind = upgradeabilityAssessment.uups ? 'uups' : 'transparent';
            const report = getUpgradeableContractReport(sourceContract, reference, { ...opts, kind: kind });
            if (report !== undefined) {
                upgradeableContractReports.push(report);
            }
        }
    }
    return upgradeableContractReports;
}
exports.getContractReports = getContractReports;
function getUpgradeableContractReport(contract, referenceContract, opts) {
    let version;
    try {
        version = (0, __1.getContractVersion)(contract.validationData, contract.fullyQualifiedName);
    }
    catch (e) {
        if (e.message.endsWith('is abstract')) {
            // Skip abstract upgradeable contracts - they will be validated as part of their caller contracts
            // for the functions that are in use.
            return undefined;
        }
        else {
            throw e;
        }
    }
    (0, debug_1.default)('Checking: ' + contract.fullyQualifiedName);
    const standaloneReport = getStandaloneReport(contract.validationData, version, opts);
    let reference;
    let storageLayoutReport;
    if (opts.unsafeSkipStorageCheck !== true && referenceContract !== undefined) {
        const layout = (0, __1.getStorageLayout)(contract.validationData, version);
        const referenceVersion = (0, __1.getContractVersion)(referenceContract.validationData, referenceContract.fullyQualifiedName);
        const referenceLayout = (0, __1.getStorageLayout)(referenceContract.validationData, referenceVersion);
        reference = referenceContract.fullyQualifiedName;
        storageLayoutReport = (0, __1.getStorageUpgradeReport)(referenceLayout, layout, (0, __1.withValidationDefaults)(opts));
    }
    return new UpgradeableContractReport(contract.fullyQualifiedName, reference, standaloneReport, storageLayoutReport);
}
function getStandaloneReport(data, version, opts) {
    const errors = (0, __1.getErrors)(data, version, (0, __1.withValidationDefaults)(opts));
    return new __1.UpgradeableContractErrorReport(errors);
}
//# sourceMappingURL=contract-report.js.map