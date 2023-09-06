import { SourceContract } from './validations';
export declare class ReferenceContractNotFound extends Error {
    /**
     * The contract reference that could not be found.
     */
    readonly reference: string;
    /**
     * The fully qualified name of the contract that referenced the missing contract.
     */
    readonly origin?: string;
    constructor(reference: string, origin?: string);
}
export declare function findContract(contractName: string, origin: SourceContract | undefined, allContracts: SourceContract[]): SourceContract;
//# sourceMappingURL=find-contract.d.ts.map