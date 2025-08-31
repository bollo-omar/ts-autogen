#!/usr/bin/env node

// Post-install script to welcome users and check for updates

import { fileURLToPath } from 'url';
import path from 'path';
import { readFileSync, existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to find and read package.json
function getPackageInfo() {
    const possiblePaths = [
        path.join(__dirname, '../package.json'),     // From scripts/
        path.join(__dirname, '../../package.json'),  // From node_modules/@bollo-aggrey/ts-autogen/scripts/
        path.join(process.cwd(), 'package.json')     // From current working directory
    ];

    for (const packagePath of possiblePaths) {
        try {
            if (existsSync(packagePath)) {
                const packageJson = JSON.parse(readFileSync(packagePath, 'utf8'));
                if (packageJson.name === '@bollo-aggrey/ts-autogen') {
                    return packageJson;
                }
            }
        } catch {
            continue;
        }
    }

    // Fallback
    return {
        name: '@bollo-aggrey/ts-autogen',
        version: '0.1.2'
    };
}

const packageJson = getPackageInfo();

function showWelcomeMessage() {
    const version = packageJson.version;
    const name = packageJson.name;
    
    console.log(`
╭─────────────────────────────────────────────────────────────╮
│                                                             │
│  🎉 Thanks for installing ${name}!           │
│                                                             │
│  📦 Version: ${version}                                      │
│  📚 Docs: https://github.com/bollo-aggrey/ts-autogen        │
│                                                             │
│  🚀 Quick Start:                                            │
│                                                             │
│    import { Data, autogen } from '${name}';     │
│                                                             │
│    @Data()                                                  │
│    class MyClass {                                          │
│      @Getter() @Setter() name: string = '';                │
│    }                                                        │
│                                                             │
│    const MyTypedClass = autogen(MyClass);                  │
│                                                             │
│  💡 Check for updates: npx ts-autogen-check -u             │
│                                                             │
╰─────────────────────────────────────────────────────────────╯
`);
}

// Only show welcome message if this is a fresh install (not during CI/CD)
if (!process.env.CI && !process.env.npm_config_global) {
    showWelcomeMessage();
}
