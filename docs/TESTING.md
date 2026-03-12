# Testing Guide

## Overview

This project includes comprehensive testing coverage with both unit tests and end-to-end tests.

## Unit Tests

### Running Unit Tests

```bash
npm test
```

### Test Coverage

```bash
npm test -- --coverage
```

### What's Tested

1. **Data Operations** (`src/utils/dataOperations.test.ts`)
   - Filter logic for all criteria types
   - Sort algorithms (ascending/descending)
   - Immutability of operations
   - Edge cases and boundary conditions

2. **Components** (`src/tests/DataGrid.test.tsx`)
   - Component rendering
   - ARIA attributes
   - Data display formatting

### Writing New Tests

Follow the existing patterns in `src/tests/`. Use React Testing Library for component tests and standard Jest for utility functions.

## E2E Tests

### Running E2E Tests

```bash
# Build the application first
npm run build

# Run tests
npm run test:e2e

# Run with UI
npx playwright test --ui

# Run specific test
npx playwright test datagrid.spec.ts
```

### What's Tested

1. **Grid Loading** - Verifies data loads and displays correctly
2. **Filtering** - Tests all filter types and combinations
3. **Sorting** - Validates sort functionality
4. **Scrolling** - Ensures smooth virtualized scrolling
5. **Reset** - Tests filter reset functionality

### Performance Testing

Use Chrome DevTools to verify performance:

1. Open DevTools (F12)
2. Go to Performance tab
3. Start recording
4. Interact with the grid (scroll, filter, sort)
5. Stop recording
6. Verify FPS stays above 30

## Continuous Integration

Tests are designed to run in CI environments. Set `CI=true` environment variable for CI-specific behavior.

## Test Data

Mock data is generated via `scripts/generateData.js`. Modify `DATA_COUNT` environment variable to change dataset size for testing.
