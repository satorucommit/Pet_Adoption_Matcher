# Deployment Guide

This document provides comprehensive instructions for deploying the PetMatch application to various hosting platforms.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Configuration](#environment-configuration)
3. [Build Process](#build-process)
4. [Deployment Options](#deployment-options)
5. [CI/CD Pipeline](#cicd-pipeline)
6. [Monitoring and Analytics](#monitoring-and-analytics)
7. [Performance Optimization](#performance-optimization)
8. [Security Considerations](#security-considerations)
9. [Troubleshooting](#troubleshooting)

## Prerequisites

### System Requirements
- Node.js v14 or higher
- npm v6 or higher
- Git
- A hosting account (Netlify, Vercel, etc.)

### Required Accounts
1. [Petfinder API Account](https://www.petfinder.com/developers/)
2. (Optional) Analytics service account (Google Analytics, etc.)
3. (Optional) Error tracking service account (Sentry, etc.)

## Environment Configuration

### Environment Variables

Create a `.env.production` file with the following variables:

```env
# Petfinder API Credentials
REACT_APP_PETFINDER_API_KEY=your_production_api_key
REACT_APP_PETFINDER_API_SECRET=your_production_api_secret

# Application Settings
REACT_APP_APP_NAME=PetMatch
REACT_APP_APP_VERSION=1.0.0
REACT_APP_ENVIRONMENT=production

# Feature Flags
REACT_APP_ENABLE_MOCK_DATA=false
REACT_APP_ENABLE_ANIMATIONS=true

# Analytics (if applicable)
REACT_APP_GOOGLE_ANALYTICS_ID=your_google_analytics_id

# Error Tracking (if applicable)
REACT_APP_SENTRY_DSN=your_sentry_dsn

# Default Location (for pet searches)
REACT_APP_DEFAULT_LOCATION=New York, NY
REACT_APP_DEFAULT_RADIUS=50

# Pagination
REACT_APP_DEFAULT_PAGE_SIZE=12
```

### Security Best Practices

1. Never commit API keys to version control
2. Use different API keys for development and production
3. Restrict API key permissions to only necessary endpoints
4. Monitor API usage regularly

## Build Process

### Production Build

To create a production-ready build:

```bash
# Install dependencies
npm install

# Create production build
npm run build
```

### Build Output

The build process generates optimized files in the `build/` directory:

```
build/
├── static/
│   ├── css/
│   ├── js/
│   └── media/
├── index.html
├── manifest.json
└── robots.txt
```

### Build Optimization Features

- **Minification**: JavaScript and CSS files are minified
- **Compression**: Assets are compressed for faster loading
- **Code Splitting**: Route-based code splitting for faster initial load
- **Tree Shaking**: Unused code is removed
- **Caching**: Long-term caching headers for static assets

## Deployment Options

### Netlify Deployment

1. Sign up for a [Netlify account](https://netlify.com)
2. Install the Netlify CLI: `npm install -g netlify-cli`
3. Login to Netlify: `netlify login`
4. Deploy: `netlify deploy --prod`

**netlify.toml configuration:**
```toml
[build]
  command = "npm run build"
  publish = "build"
  base = "/"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Vercel Deployment

1. Sign up for a [Vercel account](https://vercel.com)
2. Install the Vercel CLI: `npm install -g vercel`
3. Deploy: `vercel --prod`

**vercel.json configuration:**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### GitHub Pages Deployment

1. Install `gh-pages`: `npm install --save-dev gh-pages`
2. Add deployment scripts to `package.json`:

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

3. Deploy: `npm run deploy`

### Custom Server Deployment

For deploying to a custom server:

1. Build the application: `npm run build`
2. Copy the `build/` directory contents to your web server
3. Configure your web server to serve `index.html` for all routes

**Nginx configuration example:**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/build;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**Apache configuration example:**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Netlify

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '16'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run tests
      run: npm test
      
    - name: Build
      run: npm run build
      env:
        REACT_APP_PETFINDER_API_KEY: ${{ secrets.PETFINDER_API_KEY }}
        REACT_APP_PETFINDER_API_SECRET: ${{ secrets.PETFINDER_API_SECRET }}
        
    - name: Deploy to Netlify
      uses: netlify/actions/cli@master
      env:
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
      with:
        args: deploy --prod
        cwd: './'
```

### Environment Secrets

Set the following secrets in your GitHub repository:

- `PETFINDER_API_KEY`: Production Petfinder API key
- `PETFINDER_API_SECRET`: Production Petfinder API secret
- `NETLIFY_AUTH_TOKEN`: Netlify authentication token
- `NETLIFY_SITE_ID`: Netlify site ID

## Monitoring and Analytics

### Google Analytics Integration

Add Google Analytics to your application:

1. Create a Google Analytics property
2. Add the tracking ID to your environment variables
3. Install `react-ga4`: `npm install react-ga4`
4. Initialize in your `src/index.js`:

```javascript
import ReactGA from 'react-ga4';

if (process.env.REACT_APP_GOOGLE_ANALYTICS_ID) {
  ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_ID);
}
```

### Error Tracking with Sentry

1. Create a Sentry account
2. Install Sentry: `npm install @sentry/react @sentry/tracing`
3. Initialize in your `src/index.js`:

```javascript
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

if (process.env.REACT_APP_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
  });
}
```

### Performance Monitoring

Monitor key performance metrics:

- **First Contentful Paint (FCP)**
- **Largest Contentful Paint (LCP)**
- **First Input Delay (FID)**
- **Cumulative Layout Shift (CLS)**

## Performance Optimization

### Image Optimization

1. Use modern image formats (WebP, AVIF)
2. Implement responsive images with `srcset`
3. Lazy load images below the fold
4. Compress images before upload

### Bundle Optimization

Analyze bundle size:
```bash
npm install --save-dev webpack-bundle-analyzer
npm run build
npx webpack-bundle-analyzer build/static/js/*.js
```

Optimization techniques:
- Code splitting
- Dynamic imports
- Tree shaking
- Minification

### Caching Strategy

Implement proper caching headers:

```
Cache-Control: public, max-age=31536000, immutable
```

For static assets with hashes in filenames.

### Service Worker (Optional)

Enable offline support with a service worker:

```javascript
// public/sw.js
self.addEventListener('fetch', event => {
  // Implement caching strategy
});
```

## Security Considerations

### HTTPS Enforcement

Ensure your deployment platform enforces HTTPS:
- Redirect HTTP to HTTPS
- Use HSTS headers
- Obtain valid SSL certificates

### Content Security Policy (CSP)

Implement CSP headers to prevent XSS attacks:

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';
```

### API Security

1. Use environment variables for API keys
2. Implement rate limiting
3. Validate all API responses
4. Handle errors gracefully

### Form Security

1. Implement CSRF protection
2. Validate all form inputs
3. Sanitize user data
4. Use proper encoding

## Troubleshooting

### Common Deployment Issues

#### Build Failures
**Problem**: Build process fails during deployment
**Solution**: 
1. Check Node.js version compatibility
2. Verify all dependencies are installed
3. Check for environment variable issues
4. Review build logs for specific errors

#### Runtime Errors
**Problem**: Application works locally but fails in production
**Solution**:
1. Check environment variables
2. Verify API keys are correct
3. Review browser console for errors
4. Check network requests

#### Performance Issues
**Problem**: Slow loading times in production
**Solution**:
1. Analyze bundle size
2. Optimize images
3. Implement lazy loading
4. Use CDN for static assets

#### Routing Issues
**Problem**: Page refresh results in 404 errors
**Solution**:
1. Configure server to serve `index.html` for all routes
2. Check redirect rules
3. Verify SPA configuration

### Debugging Tools

1. **Browser Developer Tools**: Network tab, Console, Performance
2. **React DevTools**: Component hierarchy and state
3. **Lighthouse**: Performance and accessibility auditing
4. **WebPageTest**: Detailed performance analysis

### Monitoring Commands

Check deployment status:
```bash
# For Netlify
netlify status

# For Vercel
vercel inspect

# For GitHub Pages
# Check repository settings and GitHub Actions logs
```

## Maintenance

### Regular Updates

1. Update dependencies regularly: `npm outdated`
2. Monitor for security vulnerabilities: `npm audit`
3. Update Node.js version as needed
4. Review and update API keys periodically

### Backup Strategy

1. Version control all code
2. Backup environment variables securely
3. Document deployment process
4. Regular database backups (if applicable)

### Scaling Considerations

For high-traffic applications:
1. Use CDN for static assets
2. Implement caching strategies
3. Consider server-side rendering
4. Monitor performance metrics

## Support

For deployment assistance:
1. Check the [Issues](https://github.com/your-username/pet-adoption-matcher/issues) section
2. Review deployment platform documentation
3. Contact hosting provider support
4. Reach out to the PetMatch community

---

This deployment guide should help you successfully deploy the PetMatch application to your preferred hosting platform. Remember to test thoroughly in a staging environment before going live.