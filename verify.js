#!/usr/bin/env node

/**
 * Verification script to check project completeness
 */

import { existsSync } from 'fs';
import { readFileSync } from 'fs';

const checks = {
  files: [
    'package.json',
    'tsconfig.json',
    'vite.config.ts',
    'Dockerfile',
    'docker-compose.yml',
    '.env.example',
    'README.md',
    'src/App.tsx',
    'src/main.tsx',
    'src/components/DataGrid/DataGrid.tsx',
    'src/components/Filters/FilterPanel.tsx',
    'src/store/dataStore.ts',
    'src/utils/dataOperations.ts',
    'src/tests/dataOperations.test.ts',
    'src/tests/DataGrid.test.tsx',
    'data/mock_data.json',
  ],
  directories: [
    'src',
    'src/components',
    'src/store',
    'src/utils',
    'src/tests',
    'data',
    'docs',
  ]
};

console.log('🔍 Verifying project structure...\n');

let allPassed = true;

// Check files
console.log('📄 Checking files:');
checks.files.forEach(file => {
  const exists = existsSync(file);
  console.log(`  ${exists ? '✅' : '❌'} ${file}`);
  if (!exists) allPassed = false;
});

console.log('\n📁 Checking directories:');
checks.directories.forEach(dir => {
  const exists = existsSync(dir);
  console.log(`  ${exists ? '✅' : '❌'} ${dir}`);
  if (!exists) allPassed = false;
});

// Check data file size
if (existsSync('data/mock_data.json')) {
  const data = JSON.parse(readFileSync('data/mock_data.json', 'utf-8'));
  console.log(`\n📊 Data verification:`);
  console.log(`  ✅ Mock data items: ${data.length.toLocaleString()}`);
  console.log(`  ${data.length >= 10000 ? '✅' : '❌'} Minimum 10,000 items`);
  if (data.length < 10000) allPassed = false;
}

console.log('\n' + '='.repeat(50));
if (allPassed) {
  console.log('✅ All checks passed! Project is ready.');
  console.log('\n🚀 Next steps:');
  console.log('  1. Run: docker-compose up --build');
  console.log('  2. Open: http://localhost:3000');
  console.log('  3. Run tests: npm test');
} else {
  console.log('❌ Some checks failed. Please review above.');
  process.exit(1);
}
