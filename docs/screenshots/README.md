# Screenshots

This directory contains screenshots demonstrating the application's features and responsive design.

## Required Screenshots

After running the application, capture the following:

1. **main-grid.png**: Full data grid view with 25,000 items loaded
2. **filtered-view.png**: Grid with active filters applied
3. **sorted-view.png**: Grid with column sorting active
4. **mobile-view.png**: Responsive layout on mobile/tablet (768px width)
5. **performance-devtools.png**: Chrome DevTools showing 30+ FPS during scrolling

## How to Capture

1. Run the application: `docker-compose up --build`
2. Open `http://localhost:3000` in Chrome
3. Use Chrome DevTools (F12) for responsive testing
4. Use screenshot tools or browser built-in screenshot feature

## Video Demo

Record a 2-5 minute video showing:
- Application loading
- Smooth scrolling through data
- Applying various filters
- Sorting by different columns
- Responsive behavior
- Performance metrics in DevTools

Save as `demo-video.mp4` in the `docs/` directory.
