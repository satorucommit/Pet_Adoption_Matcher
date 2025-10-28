# API Documentation

This document provides detailed information about the APIs used in the PetMatch application.

## Table of Contents

1. [Petfinder API](#petfinder-api)
2. [Authentication](#authentication)
3. [Endpoints](#endpoints)
4. [Error Handling](#error-handling)
5. [Rate Limiting](#rate-limiting)
6. [Data Models](#data-models)

## Petfinder API

PetMatch uses the Petfinder API v2 to fetch real pet data from shelters. The API provides comprehensive information about adoptable pets, including photos, descriptions, and characteristics.

### Base URL
```
https://api.petfinder.com/v2/
```

### API Key Registration
To use the Petfinder API, you need to register for API credentials:
1. Visit [Petfinder Developers](https://www.petfinder.com/developers/)
2. Click "Register for an API Key"
3. Fill out the registration form
4. You will receive an API Key and API Secret

### Environment Variables
Set the following environment variables in your `.env` file:
```env
REACT_APP_PETFINDER_API_KEY=your_api_key_here
REACT_APP_PETFINDER_API_SECRET=your_api_secret_here
```

## Authentication

Petfinder API uses OAuth2 for authentication. The application automatically handles token management:

### Token Request
```http
POST https://api.petfinder.com/v2/oauth2/token
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials&client_id={CLIENT_ID}&client_secret={CLIENT_SECRET}
```

### Token Response
```json
{
  "token_type": "Bearer",
  "expires_in": 3600,
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Token Refresh
The application automatically refreshes expired tokens before making API requests.

## Endpoints

### Get Animals
Fetch a list of adoptable animals.

**Endpoint:** `GET /animals`

**Parameters:**
- `type` (string): Type of animal (dog, cat, bird, etc.)
- `breed` (string): Breed of animal
- `size` (string): Size of animal (small, medium, large, xlarge)
- `gender` (string): Gender of animal (male, female, unknown)
- `age` (string): Age of animal (baby, young, adult, senior)
- `color` (string): Color of animal
- `coat` (string): Coat length of animal
- `status` (string): Adoption status (adoptable, adopted, found)
- `location` (string): Location to search near (ZIP code or city, state)
- `distance` (integer): Distance in miles from location (default: 100)
- `sort` (string): Sort order (recent, -recent, name, -name, distance, -distance)
- `limit` (integer): Number of results to return (max: 100, default: 20)
- `page` (integer): Page number (default: 1)

**Example Request:**
```javascript
const response = await api.get('/animals', {
  params: {
    type: 'dog',
    location: 'New York, NY',
    limit: 20
  }
});
```

### Get Animal by ID
Fetch detailed information about a specific animal.

**Endpoint:** `GET /animals/{id}`

**Parameters:**
- `id` (integer): ID of the animal

**Example Request:**
```javascript
const response = await api.get('/animals/12345');
```

### Get Animal Types
Fetch a list of available animal types.

**Endpoint:** `GET /types`

**Example Request:**
```javascript
const response = await api.get('/types');
```

### Get Animal Type by Name
Fetch detailed information about a specific animal type.

**Endpoint:** `GET /types/{type}`

**Parameters:**
- `type` (string): Name of the animal type

**Example Request:**
```javascript
const response = await api.get('/types/dog');
```

### Get Breeds
Fetch a list of breeds for a specific animal type.

**Endpoint:** `GET /types/{type}/breeds`

**Parameters:**
- `type` (string): Name of the animal type

**Example Request:**
```javascript
const response = await api.get('/types/dog/breeds');
```

### Get Organizations
Fetch a list of animal welfare organizations.

**Endpoint:** `GET /organizations`

**Parameters:**
- `name` (string): Name of organization
- `location` (string): Location to search near
- `distance` (integer): Distance in miles from location
- `limit` (integer): Number of results to return
- `page` (integer): Page number

**Example Request:**
```javascript
const response = await api.get('/organizations', {
  params: {
    location: 'New York, NY',
    limit: 20
  }
});
```

### Get Organization by ID
Fetch detailed information about a specific organization.

**Endpoint:** `GET /organizations/{id}`

**Parameters:**
- `id` (string): ID of the organization

**Example Request:**
```javascript
const response = await api.get('/organizations/NY123');
```

## Error Handling

The API service includes comprehensive error handling for various scenarios:

### HTTP Status Codes
- `200`: Success
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `429`: Too Many Requests
- `500`: Internal Server Error
- `503`: Service Unavailable

### Error Response Format
```json
{
  "type": "https://httpstatus.es/400",
  "status": 400,
  "title": "Bad Request",
  "detail": "The request could not be understood by the server due to malformed syntax.",
  "instance": "/v2/animals"
}
```

### Client-Side Error Handling
The application gracefully handles API errors:
- Displays user-friendly error messages
- Provides retry mechanisms
- Falls back to mock data when necessary
- Logs errors for debugging

## Rate Limiting

Petfinder API has rate limits to prevent abuse:

### Limits
- **Anonymous requests**: 1,000 requests per day
- **Authenticated requests**: 10,000 requests per day
- **Rate limit**: 25 requests per 30 seconds

### Rate Limit Response
When rate limited, the API returns a 429 status code with headers:
```
X-RateLimit-Limit: 10000
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1625097600
```

### Client-Side Rate Limiting
The application implements rate limiting strategies:
- Request queuing
- Exponential backoff
- Automatic retry after reset time

## Data Models

### Animal Object
```json
{
  "id": 12345,
  "organization_id": "NY123",
  "url": "https://www.petfinder.com/dog/buddy-12345/ny/new-york/buddy/",
  "type": "Dog",
  "species": "Dog",
  "breeds": {
    "primary": "Golden Retriever",
    "secondary": null,
    "mixed": false,
    "unknown": false
  },
  "colors": {
    "primary": "Golden",
    "secondary": "White",
    "tertiary": null
  },
  "age": "Adult",
  "gender": "Male",
  "size": "Large",
  "coat": "Medium",
  "attributes": {
    "spayed_neutered": true,
    "house_trained": true,
    "declawed": null,
    "special_needs": false,
    "shots_current": true
  },
  "environment": {
    "children": true,
    "dogs": true,
    "cats": true
  },
  "tags": ["friendly", "active", "good-with-kids"],
  "name": "Buddy",
  "description": "Buddy is a friendly Golden Retriever who loves to play fetch.",
  "organization_animal_id": "A123456",
  "photos": [
    {
      "small": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/12345/1/small.jpg",
      "medium": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/12345/1/medium.jpg",
      "large": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/12345/1/large.jpg",
      "full": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/12345/1/full.jpg"
    }
  ],
  "videos": [
    {
      "embed": "<iframe src='https://www.youtube.com/embed/12345' frameborder='0' allowfullscreen></iframe>"
    }
  ],
  "status": "adoptable",
  "status_changed_at": "2023-01-01T12:00:00Z",
  "published_at": "2023-01-01T12:00:00Z",
  "distance": 12.5,
  "contact": {
    "email": "shelter@example.com",
    "phone": "555-123-4567",
    "address": {
      "address1": "123 Main Street",
      "address2": null,
      "city": "New York",
      "state": "NY",
      "postcode": "10001",
      "country": "US"
    }
  },
  "links": {
    "self": {
      "href": "/v2/animals/12345"
    },
    "organization": {
      "href": "/v2/organizations/NY123"
    }
  }
}
```

### Organization Object
```json
{
  "id": "NY123",
  "name": "Happy Tails Animal Shelter",
  "email": "info@happytailsshelter.org",
  "phone": "555-123-4567",
  "address": {
    "address1": "123 Main Street",
    "address2": null,
    "city": "New York",
    "state": "NY",
    "postcode": "10001",
    "country": "US"
  },
  "hours": {
    "monday": "10:00 - 18:00",
    "tuesday": "10:00 - 18:00",
    "wednesday": "10:00 - 18:00",
    "thursday": "10:00 - 18:00",
    "friday": "10:00 - 18:00",
    "saturday": "10:00 - 16:00",
    "sunday": "Closed"
  },
  "url": "https://www.happytailsshelter.org",
  "website": "https://www.happytailsshelter.org",
  "mission_statement": "Our mission is to find loving homes for all animals in our care.",
  "adoption": {
    "policy": "We require all potential adopters to complete an application and meet the animal.",
    "url": "https://www.happytailsshelter.org/adoption"
  },
  "social_media": {
    "facebook": "https://www.facebook.com/happytailsshelter",
    "twitter": "https://www.twitter.com/happytailsshelter",
    "instagram": "https://www.instagram.com/happytailsshelter"
  },
  "photos": [
    {
      "small": "https://dl5zpyw5k3jeb.cloudfront.net/photos/organizations/123/small.jpg",
      "medium": "https://dl5zpyw5k3jeb.cloudfront.net/photos/organizations/123/medium.jpg",
      "large": "https://dl5zpyw5k3jeb.cloudfront.net/photos/organizations/123/large.jpg",
      "full": "https://dl5zpyw5k3jeb.cloudfront.net/photos/organizations/123/full.jpg"
    }
  ],
  "distance": 12.5
}
```

### Breeds Object
```json
{
  "breeds": [
    "Golden Retriever",
    "Labrador Retriever",
    "German Shepherd",
    "Bulldog",
    "Beagle"
  ]
}
```

## Mock Data

When API keys are not configured or API requests fail, the application uses mock data to ensure functionality:

### Mock Animal Data
```javascript
const mockAnimals = [
  {
    id: 1,
    name: "Buddy",
    type: "Dog",
    breeds: { primary: "Golden Retriever" },
    age: "Adult",
    gender: "Male",
    size: "Large",
    description: "Friendly and energetic Golden Retriever",
    photos: [{ medium: "https://images.dog.ceo/breeds/retriever-golden/n02099601_1010.jpg" }],
    matchScore: 95
  },
  // ... additional mock animals
];
```

## Best Practices

### API Usage Guidelines
1. Cache responses when appropriate
2. Handle rate limits gracefully
3. Implement proper error handling
4. Use environment variables for API keys
5. Log API errors for debugging
6. Provide fallbacks for failed requests

### Security Considerations
1. Never expose API keys in client-side code
2. Use HTTPS for all API requests
3. Validate and sanitize API responses
4. Implement proper authentication
5. Protect against CORS issues

### Performance Optimization
1. Implement request caching
2. Use pagination for large datasets
3. Optimize image loading
4. Minimize unnecessary API calls
5. Implement lazy loading for non-critical data