// src/services/apiConfig.js
// Configuration file for API endpoints and keys

// In a real application, you would use environment variables
// For development, we're using a placeholder
const API_CONFIG = {
  // Petfinder API credentials (you would get these by registering at https://www.petfinder.com/developers/)
  PETFINDER_API_KEY: process.env.REACT_APP_PETFINDER_API_KEY || 'your-api-key-here',
  PETFINDER_API_SECRET: process.env.REACT_APP_PETFINDER_API_SECRET || 'your-api-secret-here',
  
  // API endpoints
  PETFINDER_BASE_URL: 'https://api.petfinder.com/v2',
  
  // Our custom API (if you have one)
  CUSTOM_API_BASE_URL: process.env.REACT_APP_CUSTOM_API_URL || 'http://localhost:3001/api',
  
  // Default headers
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

export default API_CONFIG;