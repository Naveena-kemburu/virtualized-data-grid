# Contributing Guide

## Development Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd virtualized-data-grid
```

2. **Install dependencies**
```bash
npm install
```

3. **Generate mock data**
```bash
npm run generate-data
```

4. **Start development server**
```bash
npm run dev
```

## Code Style

- Use TypeScript for all new files
- Follow existing code formatting
- Use meaningful variable names
- Add comments for complex logic
- Keep functions small and focused

## Component Guidelines

- Use functional components with hooks
- Wrap expensive components in React.memo
- Use useCallback for event handlers
- Use useMemo for expensive calculations
- Add proper TypeScript types

## State Management

- Use Zustand for global state
- Keep state minimal and normalized
- Use immutable update patterns
- Avoid prop drilling

## Testing

- Write unit tests for utilities
- Write component tests for UI
- Write E2E tests for user flows
- Aim for 80%+ code coverage

## Pull Request Process

1. Create a feature branch
2. Make your changes
3. Add/update tests
4. Run tests: `npm test`
5. Build: `npm run build`
6. Submit PR with clear description

## Performance Considerations

- Always test with 25k+ rows
- Check FPS in Chrome DevTools
- Measure filter/sort times
- Avoid unnecessary re-renders
- Use virtualization for lists

## Accessibility

- Use semantic HTML
- Add ARIA labels
- Ensure keyboard navigation
- Test with screen readers
- Maintain color contrast

## Questions?

Open an issue for discussion before major changes.
