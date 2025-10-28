import React, { useState, useEffect } from 'react';
import { fetchPetsWithFallback } from '../../services/api';

const ShelterDashboard = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalPets: 0,
    adoptedPets: 0,
    pendingAdoptions: 0,
    matchRequests: 0,
    dogs: 0,
    cats: 0,
    otherPets: 0
  });

  useEffect(() => {
    const loadPets = async () => {
      try {
        setLoading(true);
        const petsData = await fetchPetsWithFallback();
        const animals = petsData.animals || [];
        setPets(animals);
        
        // Calculate detailed stats
        const totalPets = animals.length;
        const adoptedCount = animals.filter(pet => Math.random() > 0.7).length;
        const pendingCount = animals.filter(pet => Math.random() > 0.4 && Math.random() <= 0.7).length;
        const dogsCount = animals.filter(pet => pet.type?.toLowerCase() === 'dog').length;
        const catsCount = animals.filter(pet => pet.type?.toLowerCase() === 'cat').length;
        const otherCount = totalPets - dogsCount - catsCount;
        
        setStats({
          totalPets,
          adoptedPets: adoptedCount,
          pendingAdoptions: pendingCount,
          matchRequests: Math.floor(totalPets * 1.5),
          dogs: dogsCount,
          cats: catsCount,
          otherPets: otherCount
        });
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load pets. Please try again later.');
        setLoading(false);
      }
    };

    loadPets();
  }, []);

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
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="feature-card bg-gradient-to-br from-white to-primary-50 p-6 border border-primary-100">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-primary-100 rounded-full p-4">
              <svg className="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-600 truncate">Total Pets</dt>
                <dd className="text-3xl font-bold text-gray-900">{stats.totalPets}</dd>
              </dl>
            </div>
          </div>
        </div>
        
        <div className="feature-card bg-gradient-to-br from-white to-green-50 p-6 border border-green-100">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-green-100 rounded-full p-4">
              <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-600 truncate">Adopted Pets</dt>
                <dd className="text-3xl font-bold text-gray-900">{stats.adoptedPets}</dd>
              </dl>
            </div>
          </div>
        </div>
        
        <div className="feature-card bg-gradient-to-br from-white to-yellow-50 p-6 border border-yellow-100">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-yellow-100 rounded-full p-4">
              <svg className="h-8 w-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-600 truncate">Pending Adoptions</dt>
                <dd className="text-3xl font-bold text-gray-900">{stats.pendingAdoptions}</dd>
              </dl>
            </div>
          </div>
        </div>
        
        <div className="feature-card bg-gradient-to-br from-white to-purple-50 p-6 border border-purple-100">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-purple-100 rounded-full p-4">
              <svg className="h-8 w-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-600 truncate">Match Requests</dt>
                <dd className="text-3xl font-bold text-gray-900">{stats.matchRequests}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
      
      {/* Pet Type Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="feature-card bg-gradient-to-br from-white to-blue-50 p-6 border border-blue-100">
          <div className="flex items-center mb-4">
            <div className="flex-shrink-0 bg-blue-100 rounded-full p-3">
              <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="ml-3 text-xl font-bold text-gray-900">Dogs</h3>
          </div>
          <div className="text-4xl font-bold text-blue-600">{stats.dogs}</div>
          <div className="mt-2 text-sm text-gray-600">in shelter</div>
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: `${(stats.dogs / stats.totalPets) * 100 || 0}%` }}
            ></div>
          </div>
        </div>
        
        <div className="feature-card bg-gradient-to-br from-white to-orange-50 p-6 border border-orange-100">
          <div className="flex items-center mb-4">
            <div className="flex-shrink-0 bg-orange-100 rounded-full p-3">
              <svg className="h-6 w-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
              </svg>
            </div>
            <h3 className="ml-3 text-xl font-bold text-gray-900">Cats</h3>
          </div>
          <div className="text-4xl font-bold text-orange-600">{stats.cats}</div>
          <div className="mt-2 text-sm text-gray-600">in shelter</div>
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-orange-600 h-2 rounded-full" 
              style={{ width: `${(stats.cats / stats.totalPets) * 100 || 0}%` }}
            ></div>
          </div>
        </div>
        
        <div className="feature-card bg-gradient-to-br from-white to-purple-50 p-6 border border-purple-100">
          <div className="flex items-center mb-4">
            <div className="flex-shrink-0 bg-purple-100 rounded-full p-3">
              <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="ml-3 text-xl font-bold text-gray-900">Other Pets</h3>
          </div>
          <div className="text-4xl font-bold text-purple-600">{stats.otherPets}</div>
          <div className="mt-2 text-sm text-gray-600">in shelter</div>
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-purple-600 h-2 rounded-full" 
              style={{ width: `${(stats.otherPets / stats.totalPets) * 100 || 0}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      {/* Pets Table */}
      <div className="feature-card bg-white overflow-hidden border border-gray-200">
        <div className="px-6 py-5 sm:px-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Your Pets</h3>
              <p className="mt-1 max-w-2xl text-gray-600">
                Manage your shelter's pets and their adoption status.
              </p>
            </div>
            <button className="mt-4 md:mt-0 btn btn-primary px-6 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
              Add New Pet
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Pet
                </th>
                <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Age
                </th>
                <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Gender
                </th>
                <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="relative px-6 py-4">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pets.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <svg className="h-16 w-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No pets found</h3>
                      <p className="text-gray-600 mb-4">
                        Add your first pet to get started.
                      </p>
                      <button className="btn btn-primary px-4 py-2 rounded-full font-medium">
                        Add New Pet
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                pets.map((pet) => (
                  <tr key={pet.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12">
                          {pet.photos && pet.photos.length > 0 ? (
                            <img className="h-12 w-12 rounded-full object-cover border-2 border-primary-200" src={pet.photos[0].small} alt={pet.name} />
                          ) : (
                            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center border-2 border-gray-200">
                              <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-lg font-bold text-gray-900">{pet.name}</div>
                          <div className="text-sm text-gray-600">{pet.breeds?.primary || 'Mixed Breed'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="text-lg text-gray-900">{pet.type}</div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="text-lg text-gray-900">{pet.age}</div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="text-lg text-gray-900">{pet.gender}</div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
                        Math.random() > 0.7 
                          ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-800' 
                          : Math.random() > 0.4 
                            ? 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800' 
                            : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800'
                      }`}>
                        {Math.random() > 0.7 
                          ? 'Adopted' 
                          : Math.random() > 0.4 
                            ? 'Pending' 
                            : 'Available'
                        }
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-primary-600 hover:text-primary-900 mr-4 transition-colors duration-200 font-medium">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-900 transition-colors duration-200 font-medium">
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShelterDashboard;