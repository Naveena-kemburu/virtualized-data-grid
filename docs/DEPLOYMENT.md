# Deployment Guide

## Docker Deployment (Recommended)

### Build and Run

```bash
docker-compose up --build
```

The application will be available at `http://localhost:3000`

### Production Deployment

1. **Build the image**:
```bash
docker build -t virtualized-data-grid:latest .
```

2. **Run the container**:
```bash
docker run -p 3000:3000 virtualized-data-grid:latest
```

3. **Push to registry** (optional):
```bash
docker tag virtualized-data-grid:latest your-registry/virtualized-data-grid:latest
docker push your-registry/virtualized-data-grid:latest
```

## Manual Deployment

### Build for Production

```bash
npm install
npm run generate-data
npm run build
```

The `dist/` directory contains the production build.

### Deploy to Static Hosting

#### Netlify

1. Connect your GitHub repository
2. Build command: `npm run generate-data && npm run build`
3. Publish directory: `dist`
4. Add `data/` directory to published assets

#### Vercel

```bash
npm install -g vercel
vercel --prod
```

#### GitHub Pages

```bash
npm run build
# Copy dist/ contents to gh-pages branch
```

## Environment Variables

Create a `.env` file based on `.env.example`:

```
DATA_COUNT=25000
NODE_ENV=production
```

## Performance Considerations

- Enable gzip compression (included in nginx.conf)
- Use CDN for static assets
- Monitor memory usage with large datasets
- Consider server-side pagination for 100k+ rows

## Monitoring

Recommended monitoring tools:
- Sentry for error tracking
- Google Analytics for usage metrics
- Lighthouse for performance audits
