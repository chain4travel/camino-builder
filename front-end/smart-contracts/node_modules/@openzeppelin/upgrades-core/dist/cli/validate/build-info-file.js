"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBuildInfoFiles = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const error_1 = require("./error");
const HARDHAT_COMPILE_COMMAND = 'npx hardhat clean && npx hardhat compile';
const FOUNDRY_COMPILE_COMMAND = 'forge clean && forge build';
const STORAGE_LAYOUT_HELP = `\
If using Hardhat, include the 'storageLayout' output selection in your Hardhat config:
  module.exports = {
    solidity: {
      settings: {
        outputSelection: {
          '*': {
            '*': ['storageLayout'],
          },
        },
      },
    },
  };
Then recompile your contracts with '${HARDHAT_COMPILE_COMMAND}' and try again.

If using Foundry, include the "storageLayout" extra output in foundry.toml:
  [profile.default]
  build_info = true
  extra_output = ["storageLayout"]
Then recompile your contracts with '${FOUNDRY_COMPILE_COMMAND}' and try again.`;
/**
 * Gets the build info files from the build info directory.
 *
 * @param buildInfoDir Build info directory, or undefined to use the default Hardhat or Foundry build-info dir.
 * @returns The build info files with Solidity compiler input and output.
 */
async function getBuildInfoFiles(buildInfoDir) {
    const dir = await findDir(buildInfoDir);
    const jsonFiles = await getJsonFiles(dir);
    return await readBuildInfo(jsonFiles);
}
exports.getBuildInfoFiles = getBuildInfoFiles;
async function findDir(buildInfoDir) {
    if (buildInfoDir !== undefined && !(await hasJsonFiles(buildInfoDir))) {
        throw new error_1.ValidateCommandError(`The directory '${buildInfoDir}' does not exist or does not contain any build info files.`, () => `\
If using Foundry, ensure your foundry.toml file has build_info = true.
Compile your contracts with '${HARDHAT_COMPILE_COMMAND}' or '${FOUNDRY_COMPILE_COMMAND}' and try again with the correct path to the build info directory.`);
    }
    const dir = buildInfoDir ?? (await findDefaultDir());
    return dir;
}
async function findDefaultDir() {
    const hardhatRelativeDir = path_1.default.join('artifacts', 'build-info');
    const foundryRelativeDir = path_1.default.join('out', 'build-info');
    const hardhatDir = path_1.default.join(process.cwd(), hardhatRelativeDir);
    const foundryDir = path_1.default.join(process.cwd(), foundryRelativeDir);
    const hasHardhatBuildInfo = await hasJsonFiles(hardhatDir);
    const hasFoundryBuildInfo = await hasJsonFiles(foundryDir);
    if (hasHardhatBuildInfo && hasFoundryBuildInfo) {
        throw new error_1.ValidateCommandError(`Found both Hardhat and Foundry build info directories: '${hardhatRelativeDir}' and '${foundryRelativeDir}'.`, () => `Specify the build info directory that you want to validate.`);
    }
    else if (hasHardhatBuildInfo) {
        return hardhatDir;
    }
    else if (hasFoundryBuildInfo) {
        return foundryDir;
    }
    else {
        throw new error_1.ValidateCommandError(`Could not find the default Hardhat or Foundry build info directory.`, () => `Compile your contracts with '${HARDHAT_COMPILE_COMMAND}' or '${FOUNDRY_COMPILE_COMMAND}', or specify the build info directory that you want to validate.`);
    }
}
async function hasJsonFiles(dir) {
    return (await exists(dir)) && (await getJsonFiles(dir)).length > 0;
}
async function exists(dir) {
    try {
        await fs_1.promises.access(dir);
        return true;
    }
    catch (e) {
        return false;
    }
}
async function getJsonFiles(dir) {
    const files = await fs_1.promises.readdir(dir);
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    return jsonFiles.map(file => path_1.default.join(dir, file));
}
async function readBuildInfo(buildInfoFilePaths) {
    const buildInfoFiles = [];
    for (const buildInfoFilePath of buildInfoFilePaths) {
        const buildInfoJson = await readJSON(buildInfoFilePath);
        if (buildInfoJson.input === undefined ||
            buildInfoJson.output === undefined ||
            buildInfoJson.solcVersion === undefined) {
            throw new error_1.ValidateCommandError(`Build info file ${buildInfoFilePath} must contain Solidity compiler input, output, and solcVersion.`);
        }
        else {
            if (!hasStorageLayoutSetting(buildInfoJson)) {
                throw new error_1.ValidateCommandError(`Build info file ${buildInfoFilePath} does not contain storage layout.`, () => STORAGE_LAYOUT_HELP);
            }
            buildInfoFiles.push({
                input: buildInfoJson.input,
                output: buildInfoJson.output,
                solcVersion: buildInfoJson.solcVersion,
            });
        }
    }
    return buildInfoFiles;
}
function hasStorageLayoutSetting(buildInfoJson) {
    const o = buildInfoJson.input.settings?.outputSelection;
    return o?.['*']?.['*'] && (o['*']['*'].includes('storageLayout') || o['*']['*'].includes('*'));
}
async function readJSON(path) {
    return JSON.parse(await fs_1.promises.readFile(path, 'utf8'));
}
//# sourceMappingURL=build-info-file.js.map