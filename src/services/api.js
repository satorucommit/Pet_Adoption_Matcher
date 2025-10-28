// src/services/api.js
// Main API service for handling all API calls

import API_CONFIG from './apiConfig';

class ApiService {
  constructor() {
    this.baseUrl = API_CONFIG.PETFINDER_BASE_URL;
    this.apiKey = API_CONFIG.PETFINDER_API_KEY;
    this.accessToken = null;
    this.tokenExpiry = null;
  }

  // Get OAuth token for Petfinder API
  async getAuthToken() {
    // If we have a valid token, return it
    if (this.accessToken && this.tokenExpiry && new Date() < this.tokenExpiry) {
      return this.accessToken;
    }

    try {
      const response = await fetch(`${this.baseUrl}/oauth2/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(this.apiKey + ':' + API_CONFIG.PETFINDER_API_SECRET)
        },
        body: 'grant_type=client_credentials'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      this.accessToken = data.access_token;
      // Set expiry to 5 minutes before actual expiry for safety
      this.tokenExpiry = new Date(Date.now() + (data.expires_in - 300) * 1000);
      
      return this.accessToken;
    } catch (error) {
      console.error('Error fetching auth token:', error);
      throw error;
    }
  }

  // Generic API call method
  async apiCall(endpoint, options = {}) {
    try {
      const token = await this.getAuthToken();
      
      const defaultOptions = {
        headers: {
          ...API_CONFIG.DEFAULT_HEADERS,
          'Authorization': `Bearer ${token}`
        }
      };

      const mergedOptions = {
        ...defaultOptions,
        ...options,
        headers: {
          ...defaultOptions.headers,
          ...options.headers
        }
      };

      const response = await fetch(`${this.baseUrl}${endpoint}`, mergedOptions);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error calling ${endpoint}:`, error);
      throw error;
    }
  }

  // Fetch pets with fallback data
  async fetchPetsWithFallback() {
    try {
      // Try to fetch real data from Petfinder API
      const response = await this.apiCall('/animals?limit=100');
      return response;
    } catch (error) {
      console.warn('Failed to fetch pets from API, using fallback data:', error);
      
      // Return mock data as fallback
      return {
        animals: [
          {
            id: 1,
            organization_id: "ABCD1234",
            url: "https://www.petfinder.com/dog/buddy-1/",
            type: "Dog",
            species: "Dog",
            breeds: {
              primary: "Labrador Retriever",
              secondary: null,
              mixed: false,
              unknown: false
            },
            colors: {
              primary: "Yellow",
              secondary: null,
              tertiary: null
            },
            age: "Adult",
            gender: "Male",
            size: "Large",
            coat: "Short",
            attributes: {
              spayed_neutered: true,
              house_trained: true,
              declawed: false,
              special_needs: false,
              shots_current: true
            },
            environment: {
              children: true,
              dogs: true,
              cats: true
            },
            tags: [],
            name: "Buddy",
            description: "Buddy is a friendly and energetic Labrador Retriever who loves to play fetch and go for long walks. He's great with children and other pets.",
            organization_animal_id: null,
            photos: [
              {
                small: "https://place.dog/300/300",
                medium: "https://place.dog/400/400",
                large: "https://place.dog/600/600",
                full: "https://place.dog/800/800"
              }
            ],
            primary_photo_cropped: {
              small: "https://place.dog/300/300",
              medium: "https://place.dog/400/400",
              large: "https://place.dog/600/600",
              full: "https://place.dog/800/800"
            },
            videos: [],
            status: "adoptable",
            status_changed_at: "2023-06-15T15:00:00Z",
            published_at: "2023-06-15T15:00:00Z",
            distance: null,
            contact: {
              email: "shelter@example.com",
              phone: "555-123-4567",
              address: {
                address1: "123 Shelter Street",
                address2: null,
                city: "Anytown",
                state: "CA",
                postcode: "12345",
                country: "US"
              }
            },
            _links: {
              self: {
                href: "/v2/animals/1"
              },
              type: {
                href: "/v2/types/dog"
              },
              organization: {
                href: "/v2/organizations/ABCD1234"
              }
            }
          },
          {
            id: 2,
            organization_id: "EFGH5678",
            url: "https://www.petfinder.com/cat/whiskers-2/",
            type: "Cat",
            species: "Cat",
            breeds: {
              primary: "Domestic Shorthair",
              secondary: null,
              mixed: true,
              unknown: false
            },
            colors: {
              primary: "Black",
              secondary: "White",
              tertiary: null
            },
            age: "Young",
            gender: "Female",
            size: "Medium",
            coat: "Short",
            attributes: {
              spayed_neutered: true,
              house_trained: true,
              declawed: false,
              special_needs: false,
              shots_current: true
            },
            environment: {
              children: true,
              dogs: true,
              cats: true
            },
            tags: [],
            name: "Whiskers",
            description: "Whiskers is a sweet and affectionate cat who loves to cuddle. She's very playful and enjoys chasing toy mice.",
            organization_animal_id: null,
            photos: [
              {
                small: "https://placekitten.com/300/300",
                medium: "https://placekitten.com/400/400",
                large: "https://placekitten.com/600/600",
                full: "https://placekitten.com/800/800"
              }
            ],
            primary_photo_cropped: {
              small: "https://placekitten.com/300/300",
              medium: "https://placekitten.com/400/400",
              large: "https://placekitten.com/600/600",
              full: "https://placekitten.com/800/800"
            },
            videos: [],
            status: "adoptable",
            status_changed_at: "2023-06-14T10:00:00Z",
            published_at: "2023-06-14T10:00:00Z",
            distance: null,
            contact: {
              email: "shelter@example.com",
              phone: "555-987-6543",
              address: {
                address1: "123 Shelter Street",
                address2: null,
                city: "Anytown",
                state: "CA",
                postcode: "12345",
                country: "US"
              }
            },
            _links: {
              self: {
                href: "/v2/animals/2"
              },
              type: {
                href: "/v2/types/cat"
              },
              organization: {
                href: "/v2/organizations/EFGH5678"
              }
            }
          }
        ]
      };
    }
  }

  // Fetch organizations (shelters)
  async fetchOrganizations() {
    try {
      const response = await this.apiCall('/organizations?limit=50');
      return response;
    } catch (error) {
      console.error('Error fetching organizations:', error);
      throw error;
    }
  }

  // Fetch a single pet by ID
  async fetchPetById(id) {
    try {
      const response = await this.apiCall(`/animals/${id}`);
      return response.animal;
    } catch (error) {
      console.error(`Error fetching pet with ID ${id}:`, error);
      throw error;
    }
  }

  // Search pets with filters
  async searchPets(filters = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      // Add filters to query parameters
      Object.keys(filters).forEach(key => {
        if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
          queryParams.append(key, filters[key]);
        }
      });
      
      const response = await this.apiCall(`/animals?${queryParams.toString()}`);
      return response;
    } catch (error) {
      console.error('Error searching pets:', error);
      throw error;
    }
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;

// Export the fallback function for direct use
export const fetchPetsWithFallback = apiService.fetchPetsWithFallback.bind(apiService);