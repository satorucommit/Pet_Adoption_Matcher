# Contributing to PetMatch

Thank you for your interest in contributing to PetMatch! We welcome contributions from the community to help make pet adoption easier and more successful.

## Code of Conduct

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

## How to Contribute

### Reporting Bugs

Before submitting a bug report:
1. Check the existing issues to see if the bug has already been reported
2. Try to reproduce the bug with the latest version of the code

When submitting a bug report, please include:
- A clear and descriptive title
- Steps to reproduce the bug
- Expected behavior vs. actual behavior
- Screenshots if applicable
- Your environment (browser, OS, etc.)

### Suggesting Enhancements

We welcome feature requests! Before submitting an enhancement suggestion:
1. Check existing issues to see if the feature has already been requested
2. Provide a clear and detailed explanation of the feature
3. Explain why this feature would be useful

### Code Contributions

1. Fork the repository
2. Create a new branch for your feature or bug fix
3. Make your changes
4. Write tests if applicable
5. Ensure all tests pass
6. Submit a pull request

#### Development Setup

1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Create a new branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test your changes
6. Commit your changes: `git commit -m "Add feature"`
7. Push to your fork: `git push origin feature/your-feature-name`
8. Submit a pull request

#### Code Style

- Follow the existing code style
- Use meaningful variable and function names
- Write clear comments for complex logic
- Keep functions small and focused
- Write tests for new functionality

#### Pull Request Process

1. Ensure any install or build dependencies are removed before the end of the layer when doing a build
2. Update the README.md with details of changes to the interface
3. Increase the version numbers in any examples files and the README.md to the new version that this Pull Request would represent
4. Your pull request will be reviewed by maintainers, who may request changes

## Development Guidelines

### Folder Structure
```
src/
├── components/
│   ├── adopter/       # Components for adopters
│   ├── shelter/       # Components for shelters
│   └── common/        # Shared components
├── pages/             # Page components
├── services/          # API services and business logic
├── styles/            # CSS and styling files
└── utils/             # Utility functions
```

### Component Development
- Create reusable, well-documented components
- Use PropTypes for type checking
- Follow the existing component structure
- Ensure components are responsive and accessible

### Testing
- Write unit tests for new functionality
- Ensure all tests pass before submitting a PR
- Use React Testing Library for component tests

### Git Commit Messages
- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line



Thank you for contributing to PetMatch!