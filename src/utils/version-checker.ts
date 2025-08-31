// Version checker utility to notify users of new releases

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

/**
 * Gets the current package version from package.json
 */
function getCurrentVersion(): string {
    try {
        // Try multiple possible locations for package.json
        const possiblePaths = [
            path.join(__dirname, '../../package.json'),  // From dist/utils/
            path.join(__dirname, '../package.json'),     // From dist/
            path.join(process.cwd(), 'package.json'),    // From current working directory
            path.join(__dirname, '../../../package.json') // From node_modules
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

        // Fallback: return current version if package.json not found
        return '0.1.2';
    } catch {
        return 'unknown';
    }
}

/**
 * Checks for the latest version from npm registry
 */
async function getLatestVersion(packageName: string): Promise<string | null> {
    try {
        // Use fetch if available (Node 18+) or return null for older versions
        if (typeof fetch === 'undefined') {
            return null;
        }

        const response = await fetch(`https://registry.npmjs.org/${packageName}`, {
            method: 'GET',
            headers: { 'Accept': 'application/json' },
            signal: AbortSignal.timeout(3000) // 3 second timeout
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

/**
 * Compares two semantic version strings
 */
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

/**
 * Creates an update notification message
 */
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

/**
 * Checks for updates and returns result
 */
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

/**
 * Checks for updates and displays notification if available
 * This runs automatically but doesn't block execution
 */
export function notifyIfUpdateAvailable(): void {
    // Only check in development or when explicitly enabled
    const shouldCheck = process.env.NODE_ENV !== 'production' || process.env.TS_AUTOGEN_CHECK_UPDATES === 'true';
    
    if (!shouldCheck) return;

    // Run asynchronously without blocking
    checkForUpdates()
        .then(result => {
            if (result.hasUpdate && result.updateMessage) {
                console.log(result.updateMessage);
            }
        })
        .catch(() => {
            // Silently fail - don't interrupt user's workflow
        });
}

/**
 * Gets current version info
 */
export function getVersionInfo(): { version: string; packageName: string } {
    return {
        version: getCurrentVersion(),
        packageName: '@bollo-aggrey/ts-autogen'
    };
}
