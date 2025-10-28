import React from 'react';
import { Link } from 'react-router-dom';

const PetCard = ({ pet }) => {
  const getPetType = (type) => {
    if (type && type.toLowerCase().includes('dog')) return 'dog';
    if (type && type.toLowerCase().includes('cat')) return 'cat';
    return Math.random() > 0.5 ? 'dog' : 'cat';
  };

  const petType = getPetType(pet.type);

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 card">
      <div className="relative">
        <img 
          src={pet.image} 
          alt={pet.name} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            petType === 'dog' 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-pink-100 text-pink-800'
          }`}>
            {petType === 'dog' ? '🐕 Dog' : '🐈 Cat'}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900">{pet.name}</h3>
          <span className="text-lg font-bold text-primary-600">${pet.price || 'Free'}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{pet.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
            {pet.breed || 'Mixed Breed'}
          </span>
          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
            {pet.age || 'Young'}
          </span>
          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
            {pet.size || 'Medium'}
          </span>
        </div>
        
        <Link 
          to={`/adopter/match-results/${pet.id}`} 
          className="block w-full text-center btn btn-primary"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
};

export default PetCard;
