"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withDefaults = exports.getFunctionArgs = exports.main = void 0;
const minimist_1 = __importDefault(require("minimist"));
const _1 = require(".");
const run_1 = require("../validate/run");
const debug_1 = __importDefault(require("../utils/debug"));
const validate_upgrade_safety_1 = require("./validate/validate-upgrade-safety");
const USAGE = 'Usage: npx @openzeppelin/upgrades-core validate [<BUILD_INFO_DIR>] [<OPTIONS>]';
const DETAILS = `
Detects upgradeable contracts from a build info directory and validates whether they are upgrade safe.

Arguments:
  <BUILD_INFO_DIR>  Optional path to the build info directory which contains JSON files with Solidity compiler input and output. Defaults to 'artifacts/build-info' for Hardhat projects or 'out/build-info' for Foundry projects. If your project uses a custom output directory, you must specify its build info directory here.

Options:
  --contract <CONTRACT>  The name or fully qualified name of the contract to validate. If not specified, all upgradeable contracts in the build info directory will be validated.
  --reference <REFERENCE_CONTRACT>  Can only be used when the --contract option is also provided. The name or fully qualified name of the reference contract to use for storage layout comparisons. If not specified, uses the @custom:oz-upgrades-from annotation if it is defined in the contract that is being validated.
  --requireReference  Can only be used when the --contract option is also provided. Not compatible with --unsafeSkipStorageCheck. If specified, requires either the --reference option to be provided or the contract to have a @custom:oz-upgrades-from annotation.
  --unsafeAllow "<VALIDATION_ERRORS>"  Selectively disable one or more validation errors. Comma-separated list with one or more of the following: ${run_1.errorKinds.join(', ')}
  --unsafeAllowRenames  Configure storage layout check to allow variable renaming.
  --unsafeSkipStorageCheck  Skips checking for storage layout compatibility errors. This is a dangerous option meant to be used as a last resort.`;
async function main(args) {
    const { parsedArgs, extraArgs } = parseArgs(args);
    if (!help(parsedArgs, extraArgs)) {
        const functionArgs = getFunctionArgs(parsedArgs, extraArgs);
        const result = await (0, _1.validateUpgradeSafety)(functionArgs.buildInfoDir, functionArgs.contract, functionArgs.reference, functionArgs.opts);
        console.log(result.explain());
        process.exitCode = result.ok ? 0 : 1;
    }
}
exports.main = main;
function parseArgs(args) {
    const parsedArgs = (0, minimist_1.default)(args, {
        boolean: [
            'help',
            'unsafeAllowRenames',
            'unsafeSkipStorageCheck',
            'unsafeAllowCustomTypes',
            'unsafeAllowLinkedLibraries',
            'requireReference',
        ],
        string: ['unsafeAllow', 'contract', 'reference'],
        alias: { h: 'help' },
    });
    const extraArgs = parsedArgs._;
    (0, debug_1.default)('parsedArgs', parsedArgs);
    return { parsedArgs, extraArgs };
}
function help(parsedArgs, extraArgs) {
    if (extraArgs.length === 0 || parsedArgs['help']) {
        console.log(USAGE);
        console.log(DETAILS);
        return true;
    }
    else {
        return false;
    }
}
/**
 * Gets and validates function arguments and options.
 * @returns Function arguments
 * @throws Error if any arguments or options are invalid.
 */
function getFunctionArgs(parsedArgs, extraArgs) {
    if (extraArgs.length === 0) {
        throw new Error('Missing command. Supported commands are: validate');
    }
    else if (extraArgs[0] !== 'validate') {
        throw new Error(`Invalid command: ${extraArgs[0]}. Supported commands are: validate`);
    }
    else if (extraArgs.length > 2) {
        throw new Error('The validate command takes only one argument: the build info directory.');
    }
    else {
        const buildInfoDir = extraArgs.length === 1 ? undefined : extraArgs[1];
        const contract = getAndValidateString(parsedArgs, 'contract');
        const reference = getAndValidateString(parsedArgs, 'reference');
        const opts = withDefaults(parsedArgs);
        if (contract === undefined) {
            if (reference !== undefined) {
                throw new Error('The --reference option can only be used along with the --contract option.');
            }
            else if (opts.requireReference) {
                throw new Error('The --requireReference option can only be used along with the --contract option.');
            }
        }
        return { buildInfoDir, contract, reference, opts };
    }
}
exports.getFunctionArgs = getFunctionArgs;
function getAndValidateString(parsedArgs, option) {
    const value = parsedArgs[option];
    if (value !== undefined && value.trim().length === 0) {
        throw new Error(`Invalid option: --${option} cannot be empty`);
    }
    return value;
}
function validateOptions(parsedArgs) {
    const invalidArgs = Object.keys(parsedArgs).filter(key => ![
        'help',
        'h',
        '_',
        'unsafeAllowRenames',
        'unsafeSkipStorageCheck',
        'unsafeAllowCustomTypes',
        'unsafeAllowLinkedLibraries',
        'unsafeAllow',
        'contract',
        'reference',
        'requireReference',
    ].includes(key));
    if (invalidArgs.length > 0) {
        throw new Error(`Invalid options: ${invalidArgs.join(', ')}`);
    }
}
function getUnsafeAllowKinds(unsafeAllow) {
    if (unsafeAllow === undefined) {
        return [];
    }
    const unsafeAllowTokens = unsafeAllow.split(/[\s,]+/);
    if (unsafeAllowTokens.some(token => !run_1.errorKinds.includes(token))) {
        // This includes empty strings
        throw new Error(`Invalid option: --unsafeAllow "${unsafeAllow}". Supported values for the --unsafeAllow option are: ${run_1.errorKinds.join(', ')}`);
    }
    return unsafeAllowTokens;
}
function withDefaults(parsedArgs) {
    validateOptions(parsedArgs);
    const allOpts = {
        unsafeAllowRenames: parsedArgs['unsafeAllowRenames'],
        unsafeSkipStorageCheck: parsedArgs['unsafeSkipStorageCheck'],
        unsafeAllowCustomTypes: parsedArgs['unsafeAllowCustomTypes'],
        unsafeAllowLinkedLibraries: parsedArgs['unsafeAllowLinkedLibraries'],
        unsafeAllow: getUnsafeAllowKinds(parsedArgs['unsafeAllow']),
        requireReference: parsedArgs['requireReference'],
    };
    return (0, validate_upgrade_safety_1.withCliDefaults)(allOpts);
}
exports.withDefaults = withDefaults;
//# sourceMappingURL=validate.js.map