#!/usr/bin/env node

// CLI tool for checking version updates

import { checkForUpdates, getVersionInfo } from '../utils/version-checker';

async function main() {
    const args = process.argv.slice(2);
    const command = args[0];

    if (command === '--version' || command === '-v') {
        const info = getVersionInfo();
        console.log(`${info.packageName} v${info.version}`);
        return;
    }

    if (command === '--check-updates' || command === '-u') {
        console.log('🔍 Checking for updates...\n');
        
        try {
            const result = await checkForUpdates();
            
            if (result.hasUpdate) {
                console.log(result.updateMessage);
            } else {
                console.log(`✅ You're using the latest version (${result.currentVersion})`);
            }
        } catch (error) {
            console.error('❌ Failed to check for updates:', error);
            process.exit(1);
        }
        return;
    }

    // Default: show help
    console.log(`
📦 TypeScript Autogen CLI

Usage:
  ts-autogen-check [command]

Commands:
  -v, --version        Show current version
  -u, --check-updates  Check for available updates
  -h, --help          Show this help message

Examples:
  ts-autogen-check --version
  ts-autogen-check --check-updates
`);
}

main().catch(console.error);
