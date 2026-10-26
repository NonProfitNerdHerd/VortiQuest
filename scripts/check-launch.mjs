import { readFileSync } from 'node:fs';
const source = readFileSync(new URL('../src/data/site.ts', import.meta.url), 'utf8');
const issues = [];
if (!/domainConfirmed:\s*true/.test(source)) issues.push('Confirm SITE_URL and set site.domainConfirmed to true in src/data/site.ts.');
if (/github:\s*''/.test(source)) issues.push('Add the GitHub organization/account URL.');
if (/repository:\s*''/.test(source)) issues.push('Add the verified repository URL for every product.');
if (/verified:\s*false/.test(source)) issues.push('Confirm product descriptions and capabilities for VortiBlog.');
if (issues.length) { console.error('Production launch checklist is incomplete:\n' + issues.map(s => `- ${s}`).join('\n')); process.exitCode = 1; }
else console.log('Content launch checks passed. Also complete the manual screenshot, privacy, and preview checks in README.md.');
