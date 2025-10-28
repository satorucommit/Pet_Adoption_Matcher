import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PetCard from './PetCard';

const MatchResults = ({ userPreferences }) => {
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [loading, setLoading] = useState(true);

  const sampleMatches = [
    {
      id: 1,
      name: 'Buddy',
      type: 'Dog',
      breed: 'Golden Retriever',
      age: '2 years',
      size: 'Large',
      gender: 'Male',
      image: 'https://images.dog.ceo/breeds/retriever-golden/n02099601_1010.jpg',
      description: 'Buddy is a friendly and energetic Golden Retriever who loves to play fetch and go for long walks. He\'s great with children and other pets.',
      compatibility: 95,
      price: 0
    },
    {
      id: 2,
      name: 'Luna',
      type: 'Dog',
      breed: 'Labrador',
      age: '1 year',
      size: 'Medium',
      gender: 'Female',
      image: 'https://images.dog.ceo/breeds/labrador/n02099712_1150.jpg',
      description: 'Luna is a gentle and intelligent Labrador who enjoys swimming and cuddling. She\'s well-trained and loves to learn new tricks.',
      compatibility: 88,
      price: 0
    },
    {
      id: 3,
      name: 'Max',
      type: 'Dog',
      breed: 'Husky',
      age: '3 years',
      size: 'Large',
      gender: 'Male',
      image: 'https://images.dog.ceo/breeds/husky/n02110185_10844.jpg',
      description: 'Max is a beautiful Siberian Husky with striking blue eyes. He\'s adventurous and loves the outdoors, especially in snowy conditions.',
      compatibility: 82,
      price: 0
    },
    {
      id: 4,
      name: 'Whiskers',
      type: 'Cat',
      breed: 'Persian',
      age: '4 years',
      size: 'Medium',
      gender: 'Female',
      image: 'https://cdn2.thecatapi.com/images/123.jpg',
      description: 'Whiskers is a calm and affectionate Persian cat who enjoys lounging in sunny spots. She has a luxurious long coat and a sweet personality.',
      compatibility: 91,
      price: 0
    },
    {
      id: 5,
      name: 'Oliver',
      type: 'Cat',
      breed: 'Siamese',
      age: '2 years',
      size: 'Medium',
      gender: 'Male',
      image: 'https://cdn2.thecatapi.com/images/456.jpg',
      description: 'Oliver is a vocal and social Siamese cat who loves to interact with his humans. He\'s playful and enjoys puzzle toys.',
      compatibility: 78,
      price: 0
    },
    {
      id: 6,
      name: 'Mittens',
      type: 'Cat',
      breed: 'Maine Coon',
      age: '5 years',
      size: 'Large',
      gender: 'Female',
      image: 'https://cdn2.thecatapi.com/images/789.jpg',
      description: 'Mittens is a gentle giant of a Maine Coon. Despite her size, she\'s very gentle and gets along well with children and other pets.',
      compatibility: 85,
      price: 0
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setMatches(sampleMatches);
      setLoading(false);
    }, 1000);
  }, []);

  const getPetType = (type) => {
    if (type && type.toLowerCase().includes('dog')) return 'dog';
    if (type && type.toLowerCase().includes('cat')) return 'cat';
    return Math.random() > 0.5 ? 'dog' : 'cat';
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Finding Your Perfect Match</h2>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Perfect Matches</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Based on your preferences, we've found these wonderful companions for you
        </p>
      </div>

      {matches.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🐾</div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No matches found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your preferences to find more pets</p>
          <Link to="/adopter" className="btn btn-primary">
            Update Preferences
          </Link>
        </div>
      ) : (
        <>
          {/* Top matches */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Top Matches</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {matches.slice(0, 3).map((match) => (
                <div key={match.id} className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl card">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{match.name}</h3>
                        <p className="text-gray-600">{match.breed}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary-600">{match.compatibility}%</div>
                        <div className="text-sm text-gray-500">Match</div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <img 
                        src={match.image} 
                        alt={match.name} 
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{match.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {match.age}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {match.size}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {match.gender}
                      </span>
                    </div>
                    
                    <button 
                      onClick={() => setSelectedMatch(match)}
                      className="w-full btn btn-primary"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* All matches */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">All Matches</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {matches.map((match) => (
                <PetCard key={match.id} pet={match} />
              ))}
            </div>
          </div>
        </>
      )}

      {/* Match detail modal */}
      {selectedMatch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-gray-900">{selectedMatch.name}</h3>
                <button 
                  onClick={() => setSelectedMatch(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="mb-6">
                <img 
                  src={selectedMatch.image} 
                  alt={selectedMatch.name} 
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500">Breed</div>
                  <div className="font-medium">{selectedMatch.breed}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500">Age</div>
                  <div className="font-medium">{selectedMatch.age}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500">Size</div>
                  <div className="font-medium">{selectedMatch.size}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500">Gender</div>
                  <div className="font-medium">{selectedMatch.gender}</div>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-bold text-gray-900 mb-2">Description</h4>
                <p className="text-gray-600">{selectedMatch.description}</p>
              </div>
              
              <div className="mb-6">
                <h4 className="font-bold text-gray-900 mb-2">Compatibility</h4>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-primary-600 h-4 rounded-full" 
                    style={{ width: `${selectedMatch.compatibility}%` }}
                  ></div>
                </div>
                <div className="text-right text-primary-600 font-bold mt-1">
                  {selectedMatch.compatibility}% Match
                </div>
              </div>
              
              <div className="flex gap-4">
                <button className="flex-1 btn btn-secondary">
                  Save for Later
                </button>
                <button className="flex-1 btn btn-primary">
                  Start Adoption Process
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchResults;