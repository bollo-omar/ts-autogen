#!/usr/bin/env node

import { fileURLToPath } from 'url';
import path from 'path';
import { readFileSync, existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getPackageInfo() {
    const possiblePaths = [
        path.join(__dirname, '../package.json'),
        path.join(__dirname, '../../package.json'),
        path.join(process.cwd(), 'package.json')
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
│    import { Data, autogen } from '${name}';                │
│    const T = autogen(MyClass, { data: true } as const);     │
│                                                             │
│  💡 Check for updates: npx ts-autogen-check -u             │
│                                                             │
╰─────────────────────────────────────────────────────────────╯
`);
}

if (!process.env.CI && !process.env.npm_config_global) {
    showWelcomeMessage();
}
