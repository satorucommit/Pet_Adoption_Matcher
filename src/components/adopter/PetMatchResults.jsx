import React, { useState, useEffect } from 'react';
import PetCard from './PetCard';
import { getMatchedPets } from '../../services/matchingLogic';
import { fetchPetsWithFallback } from '../../services/api';

const PetMatchResults = ({ quizAnswers, onRetakeQuiz }) => {
  const [matchedPets, setMatchedPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPet, setSelectedPet] = useState(null);
  const [filters, setFilters] = useState({
    type: 'all',
    age: 'all',
    size: 'all',
    sortBy: 'matchScore' // New sort option
  });
  const [sortOrder, setSortOrder] = useState('desc'); // New sort order

  useEffect(() => {
    const loadPets = async () => {
      try {
        setLoading(true);
        const petsData = await fetchPetsWithFallback();
        const matched = getMatchedPets(quizAnswers, petsData.animals || []);
        setMatchedPets(matched);
        setLoading(false);
      } catch (err) {
        setError('Failed to load pets. Please try again later.');
        setLoading(false);
      }
    };

    loadPets();
  }, [quizAnswers]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  // New function to handle sorting
  const handleSortChange = (sortBy) => {
    if (filters.sortBy === sortBy) {
      // Toggle sort order if same field
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new sort field, default to descending
      setFilters(prev => ({ ...prev, sortBy }));
      setSortOrder('desc');
    }
  };

  const filteredAndSortedPets = matchedPets
    .filter(pet => {
      if (filters.type !== 'all' && pet.type?.toLowerCase() !== filters.type) {
        return false;
      }
      if (filters.age !== 'all' && pet.age !== filters.age) {
        return false;
      }
      if (filters.size !== 'all' && pet.size !== filters.size) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      let aValue, bValue;
      
      switch (filters.sortBy) {
        case 'matchScore':
          aValue = a.matchScore;
          bValue = b.matchScore;
          break;
        case 'name':
          aValue = a.name?.toLowerCase();
          bValue = b.name?.toLowerCase();
          break;
        case 'age':
          // Convert age to comparable values
          const ageValues = {
            'baby': 1,
            'young': 2,
            'adult': 3,
            'senior': 4
          };
          aValue = ageValues[a.age?.toLowerCase()] || 0;
          bValue = ageValues[b.age?.toLowerCase()] || 0;
          break;
        default:
          aValue = a[filters.sortBy];
          bValue = b[filters.sortBy];
      }
      
      if (typeof aValue === 'string') {
        return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      } else {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }
    });

  const handlePetSelect = (pet) => {
    setSelectedPet(pet);
  };

  const handleCloseDetails = () => {
    setSelectedPet(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-gradient-to-br from-white to-primary-50 rounded-2xl shadow-xl p-6 mb-8 border border-primary-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
            Your Pet Matches
          </h2>
          <button
            onClick={onRetakeQuiz}
            className="btn btn-secondary"
          >
            Retake Quiz
          </button>
        </div>
        
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="feature-card bg-white p-4">
            <label htmlFor="type-filter" className="block text-sm font-medium text-gray-700 mb-2">
              Pet Type
            </label>
            <select
              id="type-filter"
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className="input w-full rounded-lg border-2 border-primary-200 focus:border-primary-500 focus:ring-primary-500"
            >
              <option value="all">All Types</option>
              <option value="dog">Dogs</option>
              <option value="cat">Cats</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div className="feature-card bg-white p-4">
            <label htmlFor="age-filter" className="block text-sm font-medium text-gray-700 mb-2">
              Age
            </label>
            <select
              id="age-filter"
              value={filters.age}
              onChange={(e) => handleFilterChange('age', e.target.value)}
              className="input w-full rounded-lg border-2 border-primary-200 focus:border-primary-500 focus:ring-primary-500"
            >
              <option value="all">All Ages</option>
              <option value="baby">Baby</option>
              <option value="young">Young</option>
              <option value="adult">Adult</option>
              <option value="senior">Senior</option>
            </select>
          </div>
          
          <div className="feature-card bg-white p-4">
            <label htmlFor="size-filter" className="block text-sm font-medium text-gray-700 mb-2">
              Size
            </label>
            <select
              id="size-filter"
              value={filters.size}
              onChange={(e) => handleFilterChange('size', e.target.value)}
              className="input w-full rounded-lg border-2 border-primary-200 focus:border-primary-500 focus:ring-primary-500"
            >
              <option value="all">All Sizes</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
              <option value="xlarge">Extra Large</option>
            </select>
          </div>
          
          <div className="feature-card bg-white p-4">
            <label htmlFor="sort-filter" className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <div className="flex">
              <select
                id="sort-filter"
                value={filters.sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="input rounded-l-lg border-2 border-primary-200 focus:border-primary-500 focus:ring-primary-500 flex-grow"
              >
                <option value="matchScore">Match Score</option>
                <option value="name">Name</option>
                <option value="age">Age</option>
              </select>
              <button
                onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                className="bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-r-lg px-4 hover:from-primary-600 hover:to-accent-600 transition-all duration-300 flex items-center"
                title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
              >
                {sortOrder === 'asc' ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"></path>
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"></path>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        
        <p className="text-lg font-medium text-gray-700 bg-gradient-to-r from-primary-100 to-accent-100 rounded-full px-4 py-2 inline-block">
          <span className="font-bold text-primary-700">{filteredAndSortedPets.length}</span> of <span className="font-bold text-accent-700">{matchedPets.length}</span> matched pets
        </p>
      </div>
      
      {filteredAndSortedPets.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No pets found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your filters or retake the quiz to see different results.
          </p>
          <button
            onClick={onRetakeQuiz}
            className="btn btn-primary"
          >
            Retake Quiz
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAndSortedPets.map(pet => (
            <PetCard 
              key={pet.id} 
              pet={pet} 
              onSelect={handlePetSelect}
            />
          ))}
        </div>
      )}
      
      {selectedPet && (
        <div className="fixed inset-0 bg-black bg-opacity-70 overflow-y-auto h-full w-full z-50 backdrop-blur-sm">
          <div className="relative top-10 mx-auto p-6 border-0 w-11/12 md:w-3/4 lg:w-1/2 shadow-2xl rounded-2xl bg-gradient-to-br from-white to-primary-50">
            <div className="mt-3">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                  {selectedPet.name}
                </h3>
                <button
                  onClick={handleCloseDetails}
                  className="text-gray-400 hover:text-gray-600 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              {selectedPet.photos && selectedPet.photos.length > 0 ? (
                <div className="relative mb-6 rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src={selectedPet.photos[0].large || selectedPet.photos[0].medium} 
                    alt={selectedPet.name} 
                    className="w-full h-80 object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-full px-4 py-2 text-lg font-bold flex items-center shadow-xl">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                    {selectedPet.matchScore}% Match
                  </div>
                </div>
              ) : (
                <div className="w-full h-80 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center rounded-2xl mb-6 relative shadow-lg">
                  <div className="text-center">
                    <svg className="h-16 w-16 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <span className="text-gray-500 text-lg">No photo available</span>
                  </div>
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-full px-4 py-2 text-lg font-bold flex items-center shadow-xl">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                    {selectedPet.matchScore}% Match
                  </div>
                </div>
              )}
              
              <div className="mb-6">
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="bg-gradient-to-r from-primary-100 to-primary-200 text-primary-800 text-lg font-bold px-4 py-2 rounded-full shadow-sm">
                    {selectedPet.type}
                  </span>
                  <span className="bg-gray-100 text-gray-800 text-lg font-medium px-4 py-2 rounded-full shadow-sm">
                    {selectedPet.breeds?.primary || 'Mixed Breed'}
                  </span>
                  <span className="bg-gray-100 text-gray-800 text-lg font-medium px-4 py-2 rounded-full shadow-sm">
                    {selectedPet.age}
                  </span>
                  <span className="bg-gray-100 text-gray-800 text-lg font-medium px-4 py-2 rounded-full shadow-sm">
                    {selectedPet.gender}
                  </span>
                  <span className="bg-gray-100 text-gray-800 text-lg font-medium px-4 py-2 rounded-full shadow-sm">
                    {selectedPet.size}
                  </span>
                  <span className="bg-gradient-to-r from-accent-100 to-accent-200 text-accent-800 text-lg font-bold px-4 py-2 rounded-full shadow-sm">
                    {selectedPet.matchScore}% Match
                  </span>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-2xl font-bold mb-4 text-gray-900 border-b-2 border-primary-200 pb-2">About {selectedPet.name}</h4>
                  <p className="text-gray-700 text-lg leading-relaxed bg-white p-4 rounded-xl shadow-sm">
                    {selectedPet.description || 'No description available.'}
                  </p>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-2xl font-bold mb-4 text-gray-900 border-b-2 border-primary-200 pb-2">Characteristics</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl shadow-sm">
                      <div className="mr-3 p-2 bg-white rounded-full">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                      <div>
                        <span className="text-gray-700 font-medium">Good with children:</span>
                        <span className={`font-bold ml-2 ${selectedPet.environment?.children ? 'text-green-600' : 'text-red-600'}`}>
                          {selectedPet.environment?.children ? 'Yes' : 'No'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl shadow-sm">
                      <div className="mr-3 p-2 bg-white rounded-full">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                        </svg>
                      </div>
                      <div>
                        <span className="text-gray-700 font-medium">Good with dogs:</span>
                        <span className={`font-bold ml-2 ${selectedPet.environment?.dogs ? 'text-green-600' : 'text-red-600'}`}>
                          {selectedPet.environment?.dogs ? 'Yes' : 'No'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl shadow-sm">
                      <div className="mr-3 p-2 bg-white rounded-full">
                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                      <div>
                        <span className="text-gray-700 font-medium">Good with cats:</span>
                        <span className={`font-bold ml-2 ${selectedPet.environment?.cats ? 'text-green-600' : 'text-red-600'}`}>
                          {selectedPet.environment?.cats ? 'Yes' : 'No'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl shadow-sm">
                      <div className="mr-3 p-2 bg-white rounded-full">
                        <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                      <div>
                        <span className="text-gray-700 font-medium">House trained:</span>
                        <span className={`font-bold ml-2 ${selectedPet.attributes?.house_trained ? 'text-green-600' : 'text-red-600'}`}>
                          {selectedPet.attributes?.house_trained ? 'Yes' : 'No'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-xl shadow-sm">
                      <div className="mr-3 p-2 bg-white rounded-full">
                        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                        </svg>
                      </div>
                      <div>
                        <span className="text-gray-700 font-medium">Special needs:</span>
                        <span className={`font-bold ml-2 ${selectedPet.attributes?.special_needs ? 'text-red-600' : 'text-green-600'}`}>
                          {selectedPet.attributes?.special_needs ? 'Yes' : 'No'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center p-4 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-xl shadow-sm">
                      <div className="mr-3 p-2 bg-white rounded-full">
                        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                        </svg>
                      </div>
                      <div>
                        <span className="text-gray-700 font-medium">Vaccinated:</span>
                        <span className={`font-bold ml-2 ${selectedPet.attributes?.shots_current ? 'text-green-600' : 'text-red-600'}`}>
                          {selectedPet.attributes?.shots_current ? 'Yes' : 'No'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {selectedPet.contact && (
                  <div className="mb-6">
                    <h4 className="text-2xl font-bold mb-4 text-gray-900 border-b-2 border-primary-200 pb-2">Contact Information</h4>
                    <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-sm">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-gray-700 mb-2 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                            <span className="font-medium">Shelter:</span> 
                            <span className="ml-2">{selectedPet.contact.address?.address1 || 'N/A'}</span>
                          </p>
                          <p className="text-gray-700 mb-2 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                            <span className="font-medium">Email:</span> 
                            <span className="ml-2">{selectedPet.contact.email || 'N/A'}</span>
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-700 mb-2 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                            </svg>
                            <span className="font-medium">Phone:</span> 
                            <span className="ml-2">{selectedPet.contact.phone || 'N/A'}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={handleCloseDetails}
                  className="btn bg-gray-200 text-gray-800 hover:bg-gray-300 px-6 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Close
                </button>
                <button
                  className="btn bg-gradient-to-r from-primary-600 to-accent-600 text-white hover:from-primary-700 hover:to-accent-700 px-6 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Contact Shelter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetMatchResults;