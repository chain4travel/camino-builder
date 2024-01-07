"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const util_1 = require("util");
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
const rimraf_1 = require("rimraf");
const hardhat_1 = require("hardhat");
const execAsync = (0, util_1.promisify)(child_process_1.exec);
const CLI = 'node dist/cli/cli.js';
async function getTempDir(t) {
    const temp = await fs_1.promises.mkdtemp(path_1.default.join(os_1.default.tmpdir(), 'upgrades-core-test-'));
    t.teardown(() => (0, rimraf_1.rimraf)(temp));
    return temp;
}
(0, ava_1.default)('help', async (t) => {
    const output = (await execAsync(`${CLI} validate --help`)).stdout;
    t.snapshot(output);
});
(0, ava_1.default)('no args', async (t) => {
    const output = (await execAsync(CLI)).stdout;
    t.snapshot(output);
});
(0, ava_1.default)('validate - errors', async (t) => {
    const temp = await getTempDir(t);
    const buildInfo = await hardhat_1.artifacts.getBuildInfo(`contracts/test/cli/Validate.sol:Safe`);
    await fs_1.promises.writeFile(path_1.default.join(temp, 'validate.json'), JSON.stringify(buildInfo));
    const error = await t.throwsAsync(execAsync(`${CLI} validate ${temp}`));
    const expectation = [`Stdout: ${error.stdout}`, `Stderr: ${error.stderr}`];
    t.snapshot(expectation.join('\n'));
});
(0, ava_1.default)('validate - single contract', async (t) => {
    // This should check even though the contract is not detected as upgradeable, since the --contract option was used.
    const temp = await getTempDir(t);
    const buildInfo = await hardhat_1.artifacts.getBuildInfo(`contracts/test/cli/Validate.sol:NonUpgradeable`);
    await fs_1.promises.writeFile(path_1.default.join(temp, 'validate.json'), JSON.stringify(buildInfo));
    const error = await t.throwsAsync(execAsync(`${CLI} validate ${temp} --contract NonUpgradeable`));
    const expectation = [`Stdout: ${error.stdout}`, `Stderr: ${error.stderr}`];
    t.snapshot(expectation.join('\n'));
});
(0, ava_1.default)('validate - single contract, has upgrades-from', async (t) => {
    const temp = await getTempDir(t);
    const buildInfo = await hardhat_1.artifacts.getBuildInfo(`contracts/test/cli/Validate.sol:UnsafeAndStorageLayoutErrors`);
    await fs_1.promises.writeFile(path_1.default.join(temp, 'validate.json'), JSON.stringify(buildInfo));
    const error = await t.throwsAsync(execAsync(`${CLI} validate ${temp} --contract UnsafeAndStorageLayoutErrors`));
    const expectation = [`Stdout: ${error.stdout}`, `Stderr: ${error.stderr}`];
    t.snapshot(expectation.join('\n'));
});
(0, ava_1.default)('validate - single contract, reference overrides upgrades-from', async (t) => {
    const temp = await getTempDir(t);
    const buildInfo = await hardhat_1.artifacts.getBuildInfo(`contracts/test/cli/Validate.sol:UnsafeAndStorageLayoutErrors`);
    await fs_1.promises.writeFile(path_1.default.join(temp, 'validate.json'), JSON.stringify(buildInfo));
    const error = await t.throwsAsync(execAsync(`${CLI} validate ${temp} --contract UnsafeAndStorageLayoutErrors --reference Safe`));
    const expectation = [`Stdout: ${error.stdout}`, `Stderr: ${error.stderr}`];
    t.snapshot(expectation.join('\n'));
});
(0, ava_1.default)('validate - single contract, reference is uups, overrides upgrades-from', async (t) => {
    const temp = await getTempDir(t);
    const buildInfo = await hardhat_1.artifacts.getBuildInfo(`contracts/test/cli/Validate.sol:UnsafeAndStorageLayoutErrors`);
    await fs_1.promises.writeFile(path_1.default.join(temp, 'validate.json'), JSON.stringify(buildInfo));
    const error = await t.throwsAsync(execAsync(`${CLI} validate ${temp} --contract BecomesBadLayout --reference HasUpgradeTo`));
    const expectation = [`Stdout: ${error.stdout}`, `Stderr: ${error.stderr}`];
    t.snapshot(expectation.join('\n'));
});
(0, ava_1.default)('validate - single contract, reference', async (t) => {
    const temp = await getTempDir(t);
    const buildInfo = await hardhat_1.artifacts.getBuildInfo(`contracts/test/cli/Validate.sol:BecomesBadLayout`);
    await fs_1.promises.writeFile(path_1.default.join(temp, 'validate.json'), JSON.stringify(buildInfo));
    const error = await t.throwsAsync(execAsync(`${CLI} validate ${temp} --contract BecomesBadLayout --reference StorageV1`));
    const expectation = [`Stdout: ${error.stdout}`, `Stderr: ${error.stderr}`];
    t.snapshot(expectation.join('\n'));
});
(0, ava_1.default)('validate - single contract, reference, fully qualified names', async (t) => {
    const temp = await getTempDir(t);
    const buildInfo = await hardhat_1.artifacts.getBuildInfo(`contracts/test/cli/Validate.sol:BecomesBadLayout`);
    await fs_1.promises.writeFile(path_1.default.join(temp, 'validate.json'), JSON.stringify(buildInfo));
    const error = await t.throwsAsync(execAsync(`${CLI} validate ${temp} --contract contracts/test/cli/Validate.sol:BecomesBadLayout --reference contracts/test/cli/Validate.sol:StorageV1`));
    const expectation = [`Stdout: ${error.stdout}`, `Stderr: ${error.stderr}`];
    t.snapshot(expectation.join('\n'));
});
(0, ava_1.default)('validate - reference without contract option', async (t) => {
    const temp = await getTempDir(t);
    const buildInfo = await hardhat_1.artifacts.getBuildInfo(`contracts/test/cli/Validate.sol:StorageV1`);
    await fs_1.promises.writeFile(path_1.default.join(temp, 'validate.json'), JSON.stringify(buildInfo));
    const error = await t.throwsAsync(execAsync(`${CLI} validate ${temp} --reference StorageV1`));
    t.true(error?.message.includes('The --reference option can only be used along with the --contract option.'), error?.message);
});
(0, ava_1.default)('validate - emtpy contract string', async (t) => {
    const temp = await getTempDir(t);
    const buildInfo = await hardhat_1.artifacts.getBuildInfo(`contracts/test/cli/Validate.sol:StorageV1`);
    await fs_1.promises.writeFile(path_1.default.join(temp, 'validate.json'), JSON.stringify(buildInfo));
    const error = await t.throwsAsync(execAsync(`${CLI} validate ${temp} --contract --reference StorageV1`));
    t.true(error?.message.includes('Invalid option: --contract cannot be empty'), error?.message);
});
(0, ava_1.default)('validate - blank contract string', async (t) => {
    const temp = await getTempDir(t);
    const buildInfo = await hardhat_1.artifacts.getBuildInfo(`contracts/test/cli/Validate.sol:StorageV1`);
    await fs_1.promises.writeFile(path_1.default.join(temp, 'validate.json'), JSON.stringify(buildInfo));
    const error = await t.throwsAsync(execAsync(`${CLI} validate ${temp} --contract '    ' --reference StorageV1`));
    t.true(error?.message.includes('Invalid option: --contract cannot be empty'), error?.message);
});
(0, ava_1.default)('validate - empty reference string', async (t) => {
    const temp = await getTempDir(t);
    const buildInfo = await hardhat_1.artifacts.getBuildInfo(`contracts/test/cli/Validate.sol:StorageV1`);
    await fs_1.promises.writeFile(path_1.default.join(temp, 'validate.json'), JSON.stringify(buildInfo));
    const error = await t.throwsAsync(execAsync(`${CLI} validate ${temp} --contract StorageV1 --reference`));
    t.true(error?.message.includes('Invalid option: --reference cannot be empty'), error?.message);
});
(0, ava_1.default)('validate - single contract not found', async (t) => {
    const temp = await getTempDir(t);
    const buildInfo = await hardhat_1.artifacts.getBuildInfo(`contracts/test/cli/Validate.sol:BecomesBadLayout`);
    await fs_1.promises.writeFile(path_1.default.join(temp, 'validate.json'), JSON.stringify(buildInfo));
    const error = await t.throwsAsync(execAsync(`${CLI} validate ${temp} --contract NonExistent`));
    t.true(error?.message.includes('Could not find contract NonExistent.'), error?.message);
});
(0, ava_1.default)('validate - reference not found', async (t) => {
    const temp = await getTempDir(t);
    const buildInfo = await hardhat_1.artifacts.getBuildInfo(`contracts/test/cli/Validate.sol:BecomesBadLayout`);
    await fs_1.promises.writeFile(path_1.default.join(temp, 'validate.json'), JSON.stringify(buildInfo));
    const error = await t.throwsAsync(execAsync(`${CLI} validate ${temp} --contract BecomesBadLayout --reference NonExistent`));
    t.true(error?.message.includes('Could not find contract NonExistent.'), error?.message);
});
(0, ava_1.default)('validate - requireReference - no contract option', async (t) => {
    const temp = await getTempDir(t);
    const buildInfo = await hardhat_1.artifacts.getBuildInfo(`contracts/test/cli/Validate.sol:StorageV1`);
    await fs_1.promises.writeFile(path_1.default.join(temp, 'validate.json'), JSON.stringify(buildInfo));
    const error = await t.throwsAsync(execAsync(`${CLI} validate ${temp} --requireReference`));
    t.true(error?.message.includes('The --requireReference option can only be used along with the --contract option.'), error?.message);
});
(0, ava_1.default)('validate - requireReference - no reference, no upgradesFrom', async (t) => {
    const temp = await getTempDir(t);
    const buildInfo = await hardhat_1.artifacts.getBuildInfo(`contracts/test/cli/Validate.sol:StorageV1`);
    await fs_1.promises.writeFile(path_1.default.join(temp, 'validate.json'), JSON.stringify(buildInfo));
    const error = await t.throwsAsync(execAsync(`${CLI} validate ${temp} --contract StorageV1 --requireReference`));
    t.true(error?.message.includes('does not specify what contract it upgrades from'), error?.message);
});
(0, ava_1.default)('validate - requireReference and unsafeSkipStorageCheck', async (t) => {
    const temp = await getTempDir(t);
    const buildInfo = await hardhat_1.artifacts.getBuildInfo(`contracts/test/cli/Validate.sol:StorageV1`);
    await fs_1.promises.writeFile(path_1.default.join(temp, 'validate.json'), JSON.stringify(buildInfo));
    const error = await t.throwsAsync(execAsync(`${CLI} validate ${temp} --contract StorageV1 --requireReference --unsafeSkipStorageCheck`));
    t.true(error?.message.includes('The requireReference and unsafeSkipStorageCheck options cannot be used at the same time.'), error?.message);
});
(0, ava_1.default)('validate - requireReference - no reference, has upgradesFrom - safe', async (t) => {
    const temp = await getTempDir(t);
    const buildInfo = await hardhat_1.artifacts.getBuildInfo(`contracts/test/cli/Validate.sol:BecomesSafe`);
    await fs_1.promises.writeFile(path_1.default.join(temp, 'validate.json'), JSON.stringify(buildInfo));
    const output = (await execAsync(`${CLI} validate ${temp} --contract BecomesSafe --requireReference`)).stdout;
    t.snapshot(output);
});
(0, ava_1.default)('validate - requireReference - no reference, has upgradesFrom - unsafe', async (t) => {
    const temp = await getTempDir(t);
    const buildInfo = await hardhat_1.artifacts.getBuildInfo(`contracts/test/cli/Validate.sol:BecomesBadLayout`);
    await fs_1.promises.writeFile(path_1.default.join(temp, 'validate.json'), JSON.stringify(buildInfo));
    const error = await t.throwsAsync(execAsync(`${CLI} validate ${temp} --contract BecomesBadLayout --requireReference`));
    const expectation = [`Stdout: ${error.stdout}`, `Stderr: ${error.stderr}`];
    t.snapshot(expectation.join('\n'));
});
(0, ava_1.default)('validate - requireReference - has reference - unsafe', async (t) => {
    const temp = await getTempDir(t);
    const buildInfo = await hardhat_1.artifacts.getBuildInfo(`contracts/test/cli/Validate.sol:StorageV2_Bad_NoAnnotation`);
    await fs_1.promises.writeFile(path_1.default.join(temp, 'validate.json'), JSON.stringify(buildInfo));
    const error = await t.throwsAsync(execAsync(`${CLI} validate ${temp} --contract StorageV2_Bad_NoAnnotation --reference StorageV1 --requireReference`));
    const expectation = [`Stdout: ${error.stdout}`, `Stderr: ${error.stderr}`];
    t.snapshot(expectation.join('\n'));
});
(0, ava_1.default)('validate - requireReference - has reference - safe', async (t) => {
    const temp = await getTempDir(t);
    const buildInfo = await hardhat_1.artifacts.getBuildInfo(`contracts/test/cli/Validate.sol:StorageV2_Ok_NoAnnotation`);
    await fs_1.promises.writeFile(path_1.default.join(temp, 'validate.json'), JSON.stringify(buildInfo));
    const output = (await execAsync(`${CLI} validate ${temp} --contract StorageV2_Ok_NoAnnotation --reference StorageV1 --requireReference`)).stdout;
    t.snapshot(output);
});
(0, ava_1.default)('validate - no upgradeable', async (t) => {
    const temp = await getTempDir(t);
    const buildInfo = await hardhat_1.artifacts.getBuildInfo(`contracts/test/cli/Storage088.sol:Storage088`);
    await fs_1.promises.writeFile(path_1.default.join(temp, 'validate.json'), JSON.stringify(buildInfo));
    const output = (await execAsync(`${CLI} validate ${temp}`)).stdout;
    t.snapshot(output);
});
(0, ava_1.default)('validate - ok', async (t) => {
    const temp = await getTempDir(t);
    const buildInfo = await hardhat_1.artifacts.getBuildInfo(`contracts/test/cli/Annotation.sol:Annotation`);
    await fs_1.promises.writeFile(path_1.default.join(temp, 'validate.json'), JSON.stringify(buildInfo));
    const output = (await execAsync(`${CLI} validate ${temp}`)).stdout;
    t.snapshot(output);
});
(0, ava_1.default)('validate - single contract - ok', async (t) => {
    const temp = await getTempDir(t);
    const buildInfo = await hardhat_1.artifacts.getBuildInfo(`contracts/test/cli/Annotation.sol:Annotation`);
    await fs_1.promises.writeFile(path_1.default.join(temp, 'validate.json'), JSON.stringify(buildInfo));
    const output = (await execAsync(`${CLI} validate ${temp} --contract Annotation`)).stdout;
    t.snapshot(output);
});
(0, ava_1.default)('validate - fully qualified version of ambiguous contract name', async (t) => {
    const temp = await getTempDir(t);
    const buildInfo = await hardhat_1.artifacts.getBuildInfo(`contracts/test/ValidationsSameNameSafe.sol:SameName`);
    await fs_1.promises.writeFile(path_1.default.join(temp, 'validate.json'), JSON.stringify(buildInfo));
    const output = (await execAsync(`${CLI} validate ${temp} --contract contracts/test/ValidationsSameNameSafe.sol:SameName`)).stdout;
    t.snapshot(output);
});
(0, ava_1.default)('validate - references fully qualified version of ambiguous contract name', async (t) => {
    const temp = await getTempDir(t);
    const buildInfo = await hardhat_1.artifacts.getBuildInfo(`contracts/test/ValidationsSameNameSafe.sol:SameName`);
    await fs_1.promises.writeFile(path_1.default.join(temp, 'validate.json'), JSON.stringify(buildInfo));
    const output = (await execAsync(`${CLI} validate ${temp} --contract contracts/test/ValidationsSameNameSafe.sol:SameName --reference contracts/test/ValidationsSameNameUnsafe.sol:SameName`)).stdout;
    t.snapshot(output);
});
//# sourceMappingURL=cli.test.js.map