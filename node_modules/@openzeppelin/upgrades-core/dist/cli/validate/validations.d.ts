import { ValidationRunData } from '../..';
import { ContractDefinition } from 'solidity-ast';
import { BuildInfoFile } from './build-info-file';
export interface SourceContract {
    node: ContractDefinition;
    name: string;
    fullyQualifiedName: string;
    validationData: ValidationRunData;
}
export declare function validateBuildInfoContracts(buildInfoFiles: BuildInfoFile[]): SourceContract[];
//# sourceMappingURL=validations.d.ts.map