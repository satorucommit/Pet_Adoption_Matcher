import React, { useState, useEffect } from 'react';
import PetCard from './PetCard';

const PetGallery = ({ pets }) => {
  const [filteredPets, setFilteredPets] = useState(pets);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (filter === 'all') {
      setFilteredPets(pets);
    } else {
      setFilteredPets(pets.filter(pet => 
        pet.type && pet.type.toLowerCase().includes(filter)
      ));
    }
  }, [filter, pets]);

  const petTypes = [...new Set(pets.map(pet => 
    pet.type && pet.type.toLowerCase().includes('dog') ? 'dog' : 
    pet.type && pet.type.toLowerCase().includes('cat') ? 'cat' : 'other'
  ))];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Your Perfect Companion</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Browse through our adorable pets waiting for their forever homes
        </p>
      </div>

      {/* Filter buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <button
          onClick={() => setFilter('all')}
          className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
            filter === 'all' 
              ? 'bg-primary-600 text-white shadow-lg' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All Pets
        </button>
        
        {petTypes.includes('dog') && (
          <button
            onClick={() => setFilter('dog')}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 flex items-center ${
              filter === 'dog' 
                ? 'bg-primary-600 text-white shadow-lg' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <span className="mr-2">🐕</span>
            Dogs
          </button>
        )}
        
        {petTypes.includes('cat') && (
          <button
            onClick={() => setFilter('cat')}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 flex items-center ${
              filter === 'cat' 
                ? 'bg-primary-600 text-white shadow-lg' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <span className="mr-2">🐈</span>
            Cats
          </button>
        )}
      </div>

      {/* Featured pets section */}
      <div className="mb-16 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-8">Featured Pets</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pets.slice(0, 3).map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      </div>

      {/* All pets gallery */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          {filter === 'all' ? 'All Pets' : filter === 'dog' ? 'Dogs' : 'Cats'} 
          <span className="text-primary-600"> ({filteredPets.length})</span>
        </h3>
        
        {filteredPets.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🐾</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No pets found</h3>
            <p className="text-gray-600">Try selecting a different filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PetGallery;