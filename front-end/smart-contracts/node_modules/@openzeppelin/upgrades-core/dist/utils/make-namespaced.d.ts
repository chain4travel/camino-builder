import { SolcInput, SolcOutput } from '../solc-api';
/**
 * Makes a modified version of the solc input to add state variables in each contract for namespaced struct definitions,
 * so that the compiler will generate their types in the storage layout.
 *
 * This makes the following modifications to the input:
 * - Adds a state variable for each namespaced struct definition
 * - For each contract, for all node types that are not needed for storage layout or may reference deleted functions and constructors, converts them to dummy enums with random id
 * - Converts all using for directives (at file level and in contracts) to dummy enums with random id (do not delete them to avoid orphaning possible NatSpec documentation)
 * - Converts all custom errors, free functions and constants (at file level) to dummy enums with the same name (do not delete them since they might be imported by other files)
 *
 * Also sets the outputSelection to only include storageLayout and ast, since the other outputs are not needed.
 *
 * @param input The original solc input.
 * @param output The original solc output.
 * @returns The modified solc input with storage layout that includes namespaced type information.
 */
export declare function makeNamespacedInput(input: SolcInput, output: SolcOutput): SolcInput;
//# sourceMappingURL=make-namespaced.d.ts.map