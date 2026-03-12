# Quick Start Guide

## Fastest Way to Run (Docker)

```bash
docker-compose up --build
```

Open `http://localhost:3000` in your browser.

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Generate mock data (25,000 items)
npm run generate-data

# 3. Start development server
npm run dev
```

Open `http://localhost:3000` in your browser.

## Run Tests

```bash
# Unit tests
npm test

# E2E tests (requires build first)
npm run build
npm run test:e2e
```

## Build for Production

```bash
npm run build
npm run preview
```

## Verify Performance

1. Open Chrome DevTools (F12)
2. Go to Performance tab
3. Click Record
4. Scroll through the grid rapidly
5. Stop recording
6. Verify FPS is 30+ (should be 60 FPS)

## Features to Try

1. **Search**: Type in the search box (debounced)
2. **Filter by Category**: Select from dropdown
3. **Price Range**: Adjust min/max values
4. **Sort**: Click column headers (3 states: asc/desc/none)
5. **Reset**: Click "Reset Filters" button
6. **Scroll**: Smooth virtualized scrolling through 25k items

## Troubleshooting

### Port 3000 already in use
```bash
# Change port in vite.config.ts or docker-compose.yml
```

### Data not loading
```bash
# Regenerate data
npm run generate-data
```

### Tests failing
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Project Structure

```
├── src/
│   ├── components/      # React components
│   ├── store/          # Zustand state management
│   ├── utils/          # Helper functions
│   ├── types/          # TypeScript types
│   └── tests/          # Unit & E2E tests
├── data/               # Generated mock data
├── docs/               # Documentation
├── Dockerfile          # Docker configuration
└── docker-compose.yml  # Docker Compose setup
```

## Key Technologies

- React 18 + TypeScript
- TanStack Virtual (UI virtualization)
- Zustand (state management)
- Vite (build tool)
- Jest + Playwright (testing)
- Docker + Nginx (deployment)

## Performance Tips

- The grid virtualizes rows, only rendering ~30 visible items
- Filters are debounced by 300ms
- All operations use immutable data patterns
- Components are memoized to prevent unnecessary re-renders

## Need Help?

Check the full [README.md](README.md) for detailed documentation.
