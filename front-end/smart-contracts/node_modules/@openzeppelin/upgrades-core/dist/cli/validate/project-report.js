"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectReport = exports.ProjectReport = void 0;
class ProjectReport {
    constructor(upgradeableContractReports, specifiedContract) {
        this.upgradeableContractReports = upgradeableContractReports;
        this.specifiedContract = specifiedContract;
    }
    get ok() {
        return this.upgradeableContractReports.every(r => r.ok);
    }
    explain(color = true) {
        if (this.numTotal === 0) {
            return 'No upgradeable contracts detected.';
        }
        else {
            const lines = this.upgradeableContractReports.map(r => r.explain(color));
            const status = this.ok ? 'SUCCESS' : 'FAILED';
            if (this.specifiedContract) {
                lines.push(`${status}`);
            }
            else {
                const numFailed = this.numTotal - this.numPassed;
                const plural = this.numTotal === 1 ? '' : 's';
                lines.push(`${status} (${this.numTotal} upgradeable contract${plural} detected, ${this.numPassed} passed, ${numFailed} failed)`);
            }
            return lines.join('\n\n');
        }
    }
    /**
     * Number of contracts that passed upgrade safety checks.
     */
    get numPassed() {
        return this.upgradeableContractReports.filter(r => r.ok).length;
    }
    /**
     * Total number of upgradeable contracts detected.
     */
    get numTotal() {
        return this.upgradeableContractReports.length;
    }
}
exports.ProjectReport = ProjectReport;
function getProjectReport(upgradeableContractReports, specifiedContract) {
    return new ProjectReport(upgradeableContractReports, specifiedContract);
}
exports.getProjectReport = getProjectReport;
//# sourceMappingURL=project-report.js.map