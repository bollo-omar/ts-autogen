import * as fs from 'fs';
import * as path from 'path';

interface PackageInfo {
    name: string;
    version: string;
}

interface VersionCheckResult {
    currentVersion: string;
    latestVersion?: string;
    hasUpdate: boolean;
    updateMessage?: string;
}

function getCurrentVersion(): string {
    try {
        const possiblePaths = [
            path.join(__dirname, '../../package.json'),
            path.join(__dirname, '../package.json'),
            path.join(process.cwd(), 'package.json'),
            path.join(__dirname, '../../../package.json')
        ];

        for (const packagePath of possiblePaths) {
            try {
                if (fs.existsSync(packagePath)) {
                    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
                    if (packageJson.name === '@bollo-aggrey/ts-autogen' && packageJson.version) {
                        return packageJson.version;
                    }
                }
            } catch {
                continue;
            }
        }

        return '0.1.2';
    } catch {
        return 'unknown';
    }
}

async function getLatestVersion(packageName: string): Promise<string | null> {
    try {
        if (typeof fetch === 'undefined') {
            return null;
        }

        const response = await fetch(`https://registry.npmjs.org/${packageName}`, {
            method: 'GET',
            headers: { 'Accept': 'application/json' },
            signal: AbortSignal.timeout(3000)
        });

        if (!response.ok) {
            return null;
        }

        const packageInfo = await response.json();
        return packageInfo['dist-tags']?.latest || null;
    } catch {
        return null;
    }
}

function isNewerVersion(current: string, latest: string): boolean {
    const currentParts = current.split('.').map(Number);
    const latestParts = latest.split('.').map(Number);

    for (let i = 0; i < Math.max(currentParts.length, latestParts.length); i++) {
        const currentPart = currentParts[i] || 0;
        const latestPart = latestParts[i] || 0;

        if (latestPart > currentPart) return true;
        if (latestPart < currentPart) return false;
    }

    return false;
}

function createUpdateMessage(current: string, latest: string): string {
    return `
╭─────────────────────────────────────────────────────────────╮
│                                                             │
│    📦 New version of @bollo-aggrey/ts-autogen available!    │
│                                                             │
│    Current: ${current.padEnd(10)} │ Latest: ${latest.padEnd(10)}           │
│                                                             │
│    Run: npm update @bollo-aggrey/ts-autogen                 │
│                                                             │
│    Changelog: https://github.com/bollo-aggrey/ts-autogen    │
│                                                             │
╰─────────────────────────────────────────────────────────────╯
`;
}

export async function checkForUpdates(): Promise<VersionCheckResult> {
    const currentVersion = getCurrentVersion();
    const packageName = '@bollo-aggrey/ts-autogen';

    try {
        const latestVersion = await getLatestVersion(packageName);

        if (!latestVersion) {
            return {
                currentVersion,
                hasUpdate: false
            };
        }

        const hasUpdate = isNewerVersion(currentVersion, latestVersion);

        return {
            currentVersion,
            latestVersion,
            hasUpdate,
            updateMessage: hasUpdate ? createUpdateMessage(currentVersion, latestVersion) : undefined
        };
    } catch {
        return {
            currentVersion,
            hasUpdate: false
        };
    }
}

export function notifyIfUpdateAvailable(): void {
    const shouldCheck = process.env.NODE_ENV !== 'production' || process.env.TS_AUTOGEN_CHECK_UPDATES === 'true';

    if (!shouldCheck) return;

    checkForUpdates()
        .then(result => {
            if (result.hasUpdate && result.updateMessage) {
                console.log(result.updateMessage);
            }
        })
        .catch(() => {});
}

export function getVersionInfo(): { version: string; packageName: string } {
    return {
        version: getCurrentVersion(),
        packageName: '@bollo-aggrey/ts-autogen'
    };
}
