import React, { useState } from 'react';
import AddPet from '../components/shelter/AddPet';
import ShelterDashboard from '../components/shelter/ShelterDashboard';

const ShelterPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Shelter Dashboard
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Manage your pets, view adoption requests, and connect with potential families
        </p>
        <div className="flex justify-center space-x-4 mt-6">
          <div className="text-4xl">🐕</div>
          <div className="text-4xl">🐈</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-8">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`py-4 px-6 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'dashboard'
              ? 'border-primary-500 text-primary-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab('add-pet')}
          className={`py-4 px-6 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'add-pet'
              ? 'border-primary-500 text-primary-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Add New Pet
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'dashboard' ? (
          <ShelterDashboard />
        ) : (
          <AddPet />
        )}
      </div>
    </div>
  );
};

export default ShelterPage;