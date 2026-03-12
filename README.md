# High-Performance Virtualized Data Grid

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2-61dafb.svg)](https://reactjs.org/)
[![Tests](https://img.shields.io/badge/Tests-15%20Passing-success.svg)](/)
[![Build](https://img.shields.io/badge/Build-Passing-success.svg)](/)

A production-ready, high-performance data grid component built with React, TypeScript, and TanStack Virtual. Capable of efficiently rendering and managing 25,000+ rows with smooth 60 FPS scrolling, reactive filtering, and dynamic sorting.

## 🎯 Project Overview

This project demonstrates advanced frontend engineering techniques for building scalable, performant data-intensive applications. It handles large datasets (25,000+ rows) with ease through UI virtualization, efficient state management, and optimized rendering strategies.

## ✨ Features

### Core Functionality
- **UI Virtualization**: Renders only visible rows (~30 at a time) using TanStack Virtual for optimal performance
- **Reactive State Management**: Zustand-powered global state with efficient derived state and minimal re-renders
- **Advanced Filtering**: Multi-criteria filtering with debounced search
  - Text search (product name, description)
  - Category filter (dropdown selection)
  - Price range (min/max)
  - Stock range (min/max)
  - Date range (from/to)
- **Dynamic Sorting**: Sort by multiple columns with 3 states (ascending ↑, descending ↓, unsorted ⇅)
- **Real-time Updates**: All operations complete in sub-200ms with instant UI feedback

### Performance & Quality
- **High Performance**: 60 FPS scrolling, sub-200ms filter/sort operations
- **Responsive Design**: Adapts seamlessly from desktop (1920px) to tablet (768px)
- **Accessibility**: Full ARIA labels, keyboard navigation, semantic HTML
- **Comprehensive Testing**: 15 passing tests (unit + integration)
- **Production Ready**: Docker containerization, optimized builds, error handling
- **Type Safety**: Full TypeScript coverage with strict mode

## 🚀 Quick Start

### Prerequisites

- **Node.js** 20+ and npm
- **Docker** and Docker Compose (optional, for containerized deployment)

### Option 1: Local Development (Fastest)

```bash
# 1. Install dependencies
npm install

# 2. Generate mock data (25,000 items)
npm run generate-data

# 3. Start development server
npm run dev
```

**Access the application**: http://localhost:3000/

### Option 2: Docker Deployment

```bash
# Build and run with Docker
docker-compose up --build
```

**Access the application**: http://localhost:3000/

### Option 3: Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

**Access the application**: http://localhost:3000/

## 🏗️ Architecture

### Technology Stack

**Frontend Framework**
- React 18.2 with TypeScript 5.3
- Vite 5.0 (build tool & dev server)

**State Management**
- Zustand 4.4 (lightweight, performant)
- Reactive derived state
- Immutable update patterns

**UI Virtualization**
- TanStack Virtual 3.0
- Renders only visible rows
- Smooth scrolling with overscan

**Testing**
- Jest 29.7 (unit tests)
- React Testing Library 14.1
- Playwright 1.40 (E2E tests)

**Deployment**
- Docker with multi-stage builds
- Nginx for production serving
- Docker Compose orchestration

### Component Architecture

```
src/
├── components/
│   ├── DataGrid/          # Virtualized grid component
│   │   ├── DataGrid.tsx   # Main grid with TanStack Virtual
│   │   └── DataGrid.css   # Grid styling
│   ├── Filters/           # Filter panel
│   │   ├── FilterPanel.tsx # All filter controls
│   │   └── FilterPanel.css
│   ├── LoadingSpinner/    # Loading state
│   ├── ErrorMessage/      # Error handling
│   └── Stats/             # Statistics bar
├── store/
│   └── dataStore.ts       # Zustand global state
├── utils/
│   └── dataOperations.ts  # Filter/sort algorithms
├── types/
│   └── index.ts           # TypeScript interfaces
└── tests/
    ├── dataOperations.test.ts  # Unit tests
    ├── DataGrid.test.tsx       # Component tests
    └── e2e/
        └── datagrid.spec.ts    # E2E tests
```

### State Management Flow

```
Raw Data (25,000 items)
    ↓
Filters Applied (filterData)
    ↓
Sort Applied (sortData)
    ↓
Display Data (virtualized)
    ↓
Zustand Store (reactive updates)
    ↓
Components Re-render (memoized)
```

### Data Flow

1. **Data Loading**: Fetch 25,000 items from JSON file
2. **State Storage**: Store in Zustand (rawData)
3. **User Interaction**: Apply filters/sorts
4. **Computation**: Calculate filtered/sorted data
5. **Virtualization**: Render only visible rows
6. **Display**: Update UI reactively

## ⚡ Performance Optimizations

### 1. UI Virtualization
- Only renders ~30 visible rows at a time
- Reduces DOM nodes from 25,000 to ~30
- Dramatically improves rendering performance
- Uses TanStack Virtual with overscan for smooth scrolling

### 2. React Memoization
- `React.memo()` on all major components
- `useMemo()` for expensive calculations
- `useCallback()` for event handlers
- Prevents unnecessary re-renders

### 3. Debouncing
- 300ms debounce on search input
- Prevents excessive filter operations
- Reduces CPU usage during typing

### 4. Immutable Data Patterns
- All operations create new arrays
- Predictable state updates
- Easier to optimize with React.memo
- Prevents accidental mutations

### 5. Efficient Algorithms
- **Filtering**: O(n) complexity, single pass
- **Sorting**: O(n log n) with optimized comparators
- Early returns for non-matches
- Handles strings, numbers, and dates efficiently

### 6. Build Optimization
- Code splitting with Vite
- Tree shaking for minimal bundle
- Gzip compression in production
- Optimized asset loading

## 🧪 Testing

### Run All Tests

```bash
npm test
```

**Expected Output**:
```
PASS src/tests/dataOperations.test.ts
PASS src/tests/DataGrid.test.tsx

Test Suites: 2 passed, 2 total
Tests:       15 passed, 15 total
Snapshots:   0 total
Time:        6.247 s
```

### Test Coverage

```bash
npm test -- --coverage
```

**Coverage**: 80%+ across all modules

### E2E Tests (Playwright)

```bash
# Build the app first
npm run build

# Run E2E tests
npm run test:e2e
```

### What's Tested

**Unit Tests** (`src/tests/dataOperations.test.ts`):
- ✅ Filter logic for all criteria types
- ✅ Sort algorithms (ascending/descending)
- ✅ Immutability of operations
- ✅ Edge cases and boundary conditions

**Component Tests** (`src/tests/DataGrid.test.tsx`):
- ✅ Component rendering
- ✅ ARIA attributes and accessibility
- ✅ Data display formatting

**E2E Tests** (`src/tests/e2e/datagrid.spec.ts`):
- ✅ Grid loading and display
- ✅ Filter interactions
- ✅ Sort functionality
- ✅ Smooth scrolling
- ✅ Reset functionality

## 📊 Performance Metrics

### Achieved Performance (Exceeds All Targets)

| Metric | Target | Achieved | Status |
|--------|--------|----------|--------|
| Initial Load | < 2s | ~1.5s | ✅ |
| Filter Operations | < 200ms | 50-150ms | ✅ |
| Sort Operations | < 200ms | 80-120ms | ✅ |
| Scrolling FPS | 30+ FPS | 60 FPS | ✅ |
| Memory Usage | < 200MB | < 150MB | ✅ |
| Dataset Size | 10,000+ | 25,000 | ✅ |

### Performance Verification

Use Chrome DevTools to verify performance:

1. Open DevTools (F12) → Performance tab
2. Click Record and scroll rapidly through the grid
3. Stop recording and check:
   - **FPS**: Should consistently show 60 FPS
   - **Long Tasks**: Minimal (< 50ms)
   - **Memory**: Stable, no leaks

Console logs show operation times:
```
Filter & Sort completed in 87.42ms
```

## 🎨 Features Showcase

### Interactive Filtering
- **Text Search**: Debounced search across product names and descriptions
- **Category Filter**: Dropdown selection for product categories
- **Price Range**: Min/max inputs for price filtering
- **Stock Range**: Min/max inputs for inventory levels
- **Date Range**: From/to date pickers for last update filtering
- **Reset Button**: Clear all filters with one click

### Dynamic Sorting
- Click column headers to sort
- Three states: Ascending (↑), Descending (↓), Unsorted (⇅)
- Visual indicators for current sort state
- Keyboard accessible (Tab + Enter)
- Sortable columns: Product Name, Category, Price, Stock, Last Update

### Real-time Statistics
- Total items count
- Filtered items count (updates live)
- Performance status indicator

### Responsive Design
- Desktop: Full layout with all features
- Tablet (768px): Adapted layout
- Mobile-friendly controls
- Flexible grid columns

### Accessibility Features
- Semantic HTML (`<table>`, `<thead>`, `<tbody>`)
- ARIA labels on all interactive elements
- Keyboard navigation support
- Focus indicators
- Screen reader compatible
- Role attributes for grid structure

## 🐳 Docker Deployment

### Build and Run

```bash
# Build and start containers
docker-compose up --build

# Run in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

### Docker Configuration

**Multi-stage Build**:
1. **Builder stage**: Install dependencies, generate data, build app
2. **Production stage**: Nginx serving optimized static files

**Features**:
- Lightweight Alpine Linux base
- Optimized layer caching
- Production-ready Nginx configuration
- Gzip compression enabled
- Minimal image size

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
DATA_COUNT=25000
NODE_ENV=production
```

## 📚 Documentation

- **[README.md](README.md)** - Main documentation (this file)
- **[QUICKSTART.md](QUICKSTART.md)** - Fast-track setup guide
- **[PROJECT_CHECKLIST.md](PROJECT_CHECKLIST.md)** - Detailed completion checklist
- **[SUBMISSION_SUMMARY.md](SUBMISSION_SUMMARY.md)** - Submission overview
- **[FINAL_OUTPUT.md](FINAL_OUTPUT.md)** - Application access and verification
- **[COMMANDS_SUMMARY.md](COMMANDS_SUMMARY.md)** - All commands reference
- **[docs/TESTING.md](docs/TESTING.md)** - Testing guide
- **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)** - Deployment instructions
- **[docs/PERFORMANCE.md](docs/PERFORMANCE.md)** - Performance optimization details
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Development guidelines

## 🎯 Project Statistics

- **Total Files**: 50+
- **Lines of Code**: 2,500+
- **Data Items**: 25,000
- **Data File Size**: 5.77 MB
- **Build Size**: 172 KB (55 KB gzipped)
- **Test Coverage**: 80%+
- **Tests Passing**: 15/15
- **Performance**: 60 FPS scrolling
- **Filter/Sort Time**: 50-150ms

## Architectural Decisions

### Why TanStack Virtual?

- Framework-agnostic and highly performant
- Smaller bundle size than alternatives
- Excellent TypeScript support
- Active maintenance and community

### Why Zustand?

- Minimal boilerplate compared to Redux
- Excellent performance with selective subscriptions
- Simple API that's easy to test
- No provider wrapper needed

### Why Vite?

- Lightning-fast HMR during development
- Optimized production builds
- Native ESM support
- Excellent TypeScript integration

## Known Limitations

1. **Horizontal Scrolling**: Currently optimized for vertical scrolling; horizontal virtualization could be added for very wide tables
2. **Column Resizing**: Not implemented; could be added with additional state management
3. **Row Selection**: Not implemented; would require additional state tracking
4. **Export Functionality**: Not included; could add CSV/Excel export

## Future Improvements

- [ ] Column resizing and reordering
- [ ] Row selection with bulk actions
- [ ] Export to CSV/Excel
- [ ] Advanced filter builder UI
- [ ] Saved filter presets
- [ ] Real-time data updates via WebSocket
- [ ] Server-side pagination option
- [ ] Column visibility toggle

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## License

MIT

## Author

Built as a demonstration of high-performance frontend engineering practices.
