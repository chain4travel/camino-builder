import { ValidateUpgradeSafetyOptions, UpgradeableContractErrorReport } from '../..';
import { Report } from '../../standalone';
import { SourceContract } from './validations';
import { LayoutCompatibilityReport } from '../../storage/report';
import { SpecifiedContracts } from './validate-upgrade-safety';
/**
 * Report for an upgradeable contract.
 * Contains the standalone report, and if there is a reference contract, the reference contract name and storage layout report.
 */
export declare class UpgradeableContractReport implements Report {
    readonly contract: string;
    readonly reference: string | undefined;
    readonly standaloneReport: UpgradeableContractErrorReport;
    readonly storageLayoutReport: LayoutCompatibilityReport | undefined;
    constructor(contract: string, reference: string | undefined, standaloneReport: UpgradeableContractErrorReport, storageLayoutReport: LayoutCompatibilityReport | undefined);
    get ok(): boolean;
    /**
     * Explain any errors in the report.
     */
    explain(color?: boolean): string;
}
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
export declare function getContractReports(sourceContracts: SourceContract[], opts: Required<ValidateUpgradeSafetyOptions>, specifiedContracts?: SpecifiedContracts): UpgradeableContractReport[];
//# sourceMappingURL=contract-report.d.ts.map