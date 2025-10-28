import React, { useState } from 'react';

const AddPet = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Dog',
    breed: '',
    age: 'Young',
    gender: 'Male',
    size: 'Medium',
    color: '',
    description: '',
    goodWithChildren: false,
    goodWithDogs: false,
    goodWithCats: false,
    houseTrained: false,
    specialNeeds: false,
    vaccinated: false,
    photos: []
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Pet name is required';
    }
    
    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    } else if (formData.description.length < 20) {
      errors.description = 'Description should be at least 20 characters';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setSubmitting(true);
    setError(null);
    
    try {
      // In a real app, this would make an API call to add the pet
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess(true);
      setSubmitting(false);
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: '',
          type: 'Dog',
          breed: '',
          age: 'Young',
          gender: 'Male',
          size: 'Medium',
          color: '',
          description: '',
          goodWithChildren: false,
          goodWithDogs: false,
          goodWithCats: false,
          houseTrained: false,
          specialNeeds: false,
          vaccinated: false,
          photos: []
        });
        setSuccess(false);
      }, 3000);
    } catch (err) {
      setError('Failed to add pet. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="feature-card bg-gradient-to-br from-white to-primary-50 p-8 border border-primary-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
            Add New Pet
          </h2>
          <p className="text-gray-600 text-lg">
            Fill in the details below to add a new pet to your shelter.
          </p>
        </div>
        
        {success && (
          <div className="bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-500 p-5 mb-8 rounded-lg shadow-sm">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-lg font-medium text-green-800">
                  Pet added successfully! It will be reviewed and published shortly.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {error && (
          <div className="bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 p-5 mb-8 rounded-lg shadow-sm">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-lg font-medium text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="feature-card bg-white p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-5 pb-2 border-b border-primary-200">Basic Information</h3>
              
              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Pet Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`input w-full rounded-lg border-2 ${formErrors.name ? 'border-red-500' : 'border-primary-200'} focus:border-primary-500 focus:ring-primary-500`}
                    placeholder="Enter pet's name"
                  />
                  {formErrors.name && <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                      Pet Type *
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      required
                      className="input w-full rounded-lg border-2 border-primary-200 focus:border-primary-500 focus:ring-primary-500"
                    >
                      <option value="Dog">Dog</option>
                      <option value="Cat">Cat</option>
                      <option value="Rabbit">Rabbit</option>
                      <option value="Bird">Bird</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="breed" className="block text-sm font-medium text-gray-700 mb-2">
                      Breed
                    </label>
                    <input
                      type="text"
                      id="breed"
                      name="breed"
                      value={formData.breed}
                      onChange={handleChange}
                      className="input w-full rounded-lg border-2 border-primary-200 focus:border-primary-500 focus:ring-primary-500"
                      placeholder="Enter breed (if known)"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
                      Age *
                    </label>
                    <select
                      id="age"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      required
                      className="input w-full rounded-lg border-2 border-primary-200 focus:border-primary-500 focus:ring-primary-500"
                    >
                      <option value="Baby">Baby</option>
                      <option value="Young">Young</option>
                      <option value="Adult">Adult</option>
                      <option value="Senior">Senior</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                      Gender *
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                      className="input w-full rounded-lg border-2 border-primary-200 focus:border-primary-500 focus:ring-primary-500"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Unknown">Unknown</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-2">
                      Size *
                    </label>
                    <select
                      id="size"
                      name="size"
                      value={formData.size}
                      onChange={handleChange}
                      required
                      className="input w-full rounded-lg border-2 border-primary-200 focus:border-primary-500 focus:ring-primary-500"
                    >
                      <option value="Small">Small</option>
                      <option value="Medium">Medium</option>
                      <option value="Large">Large</option>
                      <option value="XLarge">Extra Large</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-2">
                      Color
                    </label>
                    <input
                      type="text"
                      id="color"
                      name="color"
                      value={formData.color}
                      onChange={handleChange}
                      className="input w-full rounded-lg border-2 border-primary-200 focus:border-primary-500 focus:ring-primary-500"
                      placeholder="Enter primary color"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="feature-card bg-white p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-5 pb-2 border-b border-primary-200">Characteristics</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                    <input
                      id="goodWithChildren"
                      name="goodWithChildren"
                      type="checkbox"
                      checked={formData.goodWithChildren}
                      onChange={handleChange}
                      className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label htmlFor="goodWithChildren" className="ml-3 block text-sm font-medium text-gray-800">
                      Good with children
                    </label>
                  </div>
                  
                  <div className="flex items-center p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                    <input
                      id="goodWithDogs"
                      name="goodWithDogs"
                      type="checkbox"
                      checked={formData.goodWithDogs}
                      onChange={handleChange}
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="goodWithDogs" className="ml-3 block text-sm font-medium text-gray-800">
                      Good with dogs
                    </label>
                  </div>
                  
                  <div className="flex items-center p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                    <input
                      id="goodWithCats"
                      name="goodWithCats"
                      type="checkbox"
                      checked={formData.goodWithCats}
                      onChange={handleChange}
                      className="h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <label htmlFor="goodWithCats" className="ml-3 block text-sm font-medium text-gray-800">
                      Good with cats
                    </label>
                  </div>
                  
                  <div className="flex items-center p-3 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg">
                    <input
                      id="houseTrained"
                      name="houseTrained"
                      type="checkbox"
                      checked={formData.houseTrained}
                      onChange={handleChange}
                      className="h-5 w-5 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                    />
                    <label htmlFor="houseTrained" className="ml-3 block text-sm font-medium text-gray-800">
                      House trained
                    </label>
                  </div>
                  
                  <div className="flex items-center p-3 bg-gradient-to-r from-red-50 to-red-100 rounded-lg">
                    <input
                      id="specialNeeds"
                      name="specialNeeds"
                      type="checkbox"
                      checked={formData.specialNeeds}
                      onChange={handleChange}
                      className="h-5 w-5 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <label htmlFor="specialNeeds" className="ml-3 block text-sm font-medium text-gray-800">
                      Special needs
                    </label>
                  </div>
                  
                  <div className="flex items-center p-3 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-lg">
                    <input
                      id="vaccinated"
                      name="vaccinated"
                      type="checkbox"
                      checked={formData.vaccinated}
                      onChange={handleChange}
                      className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="vaccinated" className="ml-3 block text-sm font-medium text-gray-800">
                      Vaccinated
                    </label>
                  </div>
                </div>
                
                <div className="feature-card bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
                  <h4 className="text-md font-bold text-gray-900 mb-3">Pet Care Tips</h4>
                  <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                    <li>Provide a detailed description to help find the right match</li>
                    <li>Be honest about the pet's behavior and needs</li>
                    <li>Good photos increase adoption chances by 3x</li>
                    <li>Include information about energy level and exercise needs</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="feature-card bg-white p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-5 pb-2 border-b border-primary-200">Description</h3>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={5}
                className={`input w-full rounded-lg border-2 ${formErrors.description ? 'border-red-500' : 'border-primary-200'} focus:border-primary-500 focus:ring-primary-500`}
                placeholder="Provide details about the pet's personality, habits, and what makes them special. Minimum 20 characters."
              />
              {formErrors.description && <p className="mt-1 text-sm text-red-600">{formErrors.description}</p>}
              <p className="mt-2 text-sm text-gray-500">Help potential adopters understand what makes this pet unique.</p>
            </div>
          </div>
          
          <div className="feature-card bg-white p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-5 pb-2 border-b border-primary-200">Photos</h3>
            
            <div className="flex justify-center px-6 pt-8 pb-10 border-2 border-dashed border-primary-300 rounded-2xl bg-gradient-to-br from-gray-50 to-primary-50">
              <div className="space-y-2 text-center">
                <div className="mx-auto bg-primary-100 rounded-full p-3 w-16 h-16 flex items-center justify-center">
                  <svg className="mx-auto h-8 w-8 text-primary-600" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="flex text-lg text-gray-700 justify-center">
                  <label htmlFor="photos" className="relative cursor-pointer bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-full font-bold px-6 py-2 shadow-lg hover:from-primary-600 hover:to-accent-600 transition-all duration-300">
                    <span>Upload Photos</span>
                    <input id="photos" name="photos" type="file" className="sr-only" multiple accept="image/*" />
                  </label>
                </div>
                <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB each</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="btn bg-gray-200 text-gray-800 hover:bg-gray-300 px-6 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="btn bg-gradient-to-r from-primary-600 to-accent-600 text-white hover:from-primary-700 hover:to-accent-700 px-6 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              {submitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Adding...
                </span>
              ) : 'Add Pet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPet;