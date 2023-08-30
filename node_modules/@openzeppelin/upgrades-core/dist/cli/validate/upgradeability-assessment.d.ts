import { SourceContract } from './validations';
export interface UpgradeabilityAssessment {
    upgradeable: boolean;
    referenceContract?: SourceContract;
    uups?: boolean;
}
export declare function getUpgradeabilityAssessment(contract: SourceContract, allContracts: SourceContract[], overrideReferenceContract?: SourceContract): UpgradeabilityAssessment;
//# sourceMappingURL=upgradeability-assessment.d.ts.map