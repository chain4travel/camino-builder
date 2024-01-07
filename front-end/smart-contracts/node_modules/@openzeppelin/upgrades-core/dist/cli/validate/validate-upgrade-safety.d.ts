import { ValidationOptions } from '../..';
import { ProjectReport } from './project-report';
import { SourceContract } from './validations';
/**
 * Validation options for upgrade safety checks.
 */
export type ValidateUpgradeSafetyOptions = Omit<ValidationOptions, 'kind'> & {
    requireReference?: boolean;
};
export type SpecifiedContracts = {
    contract: SourceContract;
    reference?: SourceContract;
};
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
export declare function validateUpgradeSafety(buildInfoDir?: string, contract?: string, reference?: string, opts?: ValidateUpgradeSafetyOptions): Promise<ProjectReport>;
export declare function findSpecifiedContracts(sourceContracts: SourceContract[], opts: Required<ValidateUpgradeSafetyOptions>, contractName?: string, referenceName?: string): SpecifiedContracts | undefined;
export declare function withCliDefaults(opts: ValidateUpgradeSafetyOptions): Required<ValidateUpgradeSafetyOptions>;
//# sourceMappingURL=validate-upgrade-safety.d.ts.map