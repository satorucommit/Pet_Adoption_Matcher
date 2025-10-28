# Project Structure Documentation

## Overview

This document provides a comprehensive overview of the PetMatch application's project structure, component organization, and architectural decisions.

## Directory Structure

```
pet-adoption-matcher/
├── .gitignore
├── CHANGELOG.md
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── LICENSE
├── README.md
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── .env
├── .env.example
├── build/
├── docs/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
└── src/
    ├── index.js
    ├── index.css
    ├── components/
    │   ├── adopter/
    │   ├── shelter/
    │   └── common/
    ├── pages/
    ├── services/
    └── utils/
```

## Source Directory Breakdown

### Components

#### Adopter Components
Located in `src/components/adopter/`

- **LifestyleQuiz.jsx**: Interactive questionnaire to assess adopter preferences and lifestyle
- **MatchResults.jsx**: Displays personalized pet recommendations with compatibility scores
- **PetCard.jsx**: Reusable component for displaying individual pet information
- **PetGallery.jsx**: Filterable and sortable gallery of available pets
- **PetMatchResults.jsx**: Detailed view of match results with advanced filtering

#### Shelter Components
Located in `src/components/shelter/`

- **AddPet.jsx**: Form for shelters to add new pets to their database
- **MatchRequests.jsx**: Management system for adoption requests from potential adopters
- **ShelterDashboard.jsx**: Analytics dashboard with shelter statistics and metrics

#### Common Components
Located in `src/components/common/`

- **AnimatedPet.jsx**: Reusable animated pet SVG components
- **Footer.jsx**: Site-wide footer with navigation and contact information
- **Navbar.jsx**: Responsive navigation bar with routing
- **ProtectedRoute.jsx**: Component for protecting routes that require authentication

### Pages
Located in `src/pages/`

- **AboutPage.jsx**: Information about the PetMatch mission and team
- **AdopterPage.jsx**: Main page for adopters with quiz, matches, and gallery
- **Home.jsx**: Landing page with introduction and call-to-action
- **ShelterPage.jsx**: Main page for shelters with dashboard and management tools

### Services
Located in `src/services/`

- **api.js**: API client for interacting with Petfinder API and custom backend
- **auth.js**: Authentication service (if applicable)
- **matching.js**: Business logic for the pet matching algorithm
- **token.js**: OAuth token management for API authentication

### Utilities
Located in `src/utils/`

- **helpers.js**: General utility functions
- **validators.js**: Form validation functions
- **formatters.js**: Data formatting functions

## Styling

### Tailwind CSS
The project uses Tailwind CSS for styling with custom configurations in:

- **tailwind.config.js**: Custom theme, colors, and extensions
- **src/index.css**: Base styles, custom animations, and component classes

### Custom Animations
Defined in `src/index.css`:
- Fade animations
- Slide animations
- Bounce and pulse effects
- Pet-specific animations (walk, float, wiggle)

## Environment Configuration

### Environment Variables
Managed through `.env` files:
- **.env**: Production environment variables
- **.env.development**: Development environment variables
- **.env.example**: Template for environment variables

### Feature Flags
Controlled through environment variables:
- `REACT_APP_ENABLE_MOCK_DATA`: Toggle mock data usage
- `REACT_APP_ENABLE_ANIMATIONS`: Toggle UI animations

## Routing

The application uses React Router for navigation:

- **/**: Home page
- **/adopter**: Adopter dashboard
- **/shelter**: Shelter dashboard
- **/about**: About page

## API Integration

### Petfinder API
Primary data source for pet information:
- OAuth2 authentication
- Token refresh management
- Error handling and fallbacks

### Custom API (if applicable)
Secondary API for additional features:
- User management
- Adoption request processing
- Analytics data

## Testing

### Test Structure
Located in `src/__tests__/` (if created):
- Component tests
- Integration tests
- Utility function tests

### Testing Libraries
- **Jest**: Test runner and assertion library
- **React Testing Library**: Component testing utilities
- **Cypress** (optional): End-to-end testing

## Build Process

### Scripts
Defined in `package.json`:
- `npm start`: Development server
- `npm run build`: Production build
- `npm test`: Run tests
- `npm run eject`: Eject from Create React App

### Build Output
Generated in the `build/` directory:
- Optimized static assets
- Bundled JavaScript and CSS
- HTML files

## Deployment

### Hosting Options
- Netlify
- Vercel
- GitHub Pages
- Custom server

### CI/CD
- GitHub Actions (if configured)
- Automated testing
- Deployment workflows

## Performance Optimization

### Code Splitting
- Route-based code splitting
- Component lazy loading

### Image Optimization
- Responsive images
- Proper image formats

### Bundle Optimization
- Tree shaking
- Minification
- Compression

## Accessibility

### A11Y Compliance
- Semantic HTML
- Proper ARIA attributes
- Keyboard navigation
- Screen reader support

## Security

### Best Practices
- Environment variable protection
- Input validation
- XSS prevention
- CSRF protection

## Contributing Guidelines

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Implement changes
4. Write tests
5. Submit pull request

### Code Standards
- ESLint configuration
- Prettier formatting
- Component organization
- Documentation requirements

## Troubleshooting

### Common Issues
- API key configuration
- Environment setup
- Dependency installation
- Build errors

### Debugging Tools
- React DevTools
- Browser developer tools
- Network tab analysis
- Console logging

## Future Enhancements

### Planned Features
- User authentication system
- Advanced matching algorithms
- Mobile application
- Admin dashboard

### Technical Improvements
- TypeScript migration
- Redux for state management
- GraphQL integration
- Progressive Web App features