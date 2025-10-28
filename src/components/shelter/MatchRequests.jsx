import React, { useState, useEffect } from 'react';

const MatchRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    // In a real app, this would fetch data from an API
    // For now, we'll simulate data
    const mockRequests = [
      {
        id: 1,
        adopterName: 'John Smith',
        adopterEmail: 'john.smith@example.com',
        adopterPhone: '555-123-4567',
        petName: 'Buddy',
        petId: '123',
        petType: 'Dog',
        matchScore: 92,
        status: 'pending',
        requestDate: '2023-06-15',
        message: 'I think Buddy would be a perfect fit for our active family. We have a large yard and two children who love dogs.'
      },
      {
        id: 2,
        adopterName: 'Emily Johnson',
        adopterEmail: 'emily.johnson@example.com',
        adopterPhone: '555-987-6543',
        petName: 'Whiskers',
        petId: '456',
        petType: 'Cat',
        matchScore: 88,
        status: 'approved',
        requestDate: '2023-06-14',
        message: 'I live in a quiet apartment and work from home, so I can give Whiskers lots of attention.'
      },
      {
        id: 3,
        adopterName: 'Michael Brown',
        adopterEmail: 'michael.brown@example.com',
        adopterPhone: '555-456-7890',
        petName: 'Luna',
        petId: '789',
        petType: 'Dog',
        matchScore: 95,
        status: 'pending',
        requestDate: '2023-06-13',
        message: 'I\'m an experienced dog owner looking for a companion for my daily runs. Luna seems perfect!'
      },
      {
        id: 4,
        adopterName: 'Sarah Davis',
        adopterEmail: 'sarah.davis@example.com',
        adopterPhone: '555-234-5678',
        petName: 'Max',
        petId: '101',
        petType: 'Dog',
        matchScore: 78,
        status: 'rejected',
        requestDate: '2023-06-12',
        message: 'I\'m interested in adopting Max. I have a small apartment but I\'m home most of the day.'
      },
      {
        id: 5,
        adopterName: 'David Wilson',
        adopterEmail: 'david.wilson@example.com',
        adopterPhone: '555-345-6789',
        petName: 'Mittens',
        petId: '202',
        petType: 'Cat',
        matchScore: 85,
        status: 'pending',
        requestDate: '2023-06-11',
        message: 'I\'ve been looking for a calm cat to keep me company. Mittens sounds like a perfect match.'
      }
    ];

    setTimeout(() => {
      setRequests(mockRequests);
      setLoading(false);
    }, 1000);
  }, []);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleStatusChange = (requestId, newStatus) => {
    setRequests(prev => 
      prev.map(request => 
        request.id === requestId 
          ? { ...request, status: newStatus }
          : request
      )
    );
  };

  const filteredRequests = requests
    .filter(request => {
      // Apply status filter
      if (filter !== 'all' && request.status !== filter) {
        return false;
      }
      
      // Apply search term filter
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        return (
          request.adopterName.toLowerCase().includes(term) ||
          request.petName.toLowerCase().includes(term) ||
          request.adopterEmail.toLowerCase().includes(term)
        );
      }
      
      return true;
    });

  // Function to get match score color
  const getMatchScoreColor = (score) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const openRequestDetails = (request) => {
    setSelectedRequest(request);
  };

  const closeRequestDetails = () => {
    setSelectedRequest(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 p-5 mb-6 rounded-lg shadow-sm">
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
    );
  }

  // Function to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-gradient-to-r from-green-100 to-green-200 text-green-800';
      case 'rejected': return 'bg-gradient-to-r from-red-100 to-red-200 text-red-800';
      default: return 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800';
    }
  };

  return (
    <div>
      <div className="feature-card bg-white overflow-hidden border border-gray-200">
        <div className="px-6 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900">Adoption Requests</h3>
          <p className="mt-2 text-gray-600">
            Review and manage adoption requests from potential adopters.
          </p>
        </div>
        
        <div className="px-6 py-5 sm:px-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handleFilterChange('all')}
                className={`px-4 py-2 rounded-full text-sm font-bold shadow-sm transition-all duration-300 ${
                  filter === 'all' 
                    ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                All ({requests.length})
              </button>
              <button
                onClick={() => handleFilterChange('pending')}
                className={`px-4 py-2 rounded-full text-sm font-bold shadow-sm transition-all duration-300 ${
                  filter === 'pending' 
                    ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                Pending ({requests.filter(r => r.status === 'pending').length})
              </button>
              <button
                onClick={() => handleFilterChange('approved')}
                className={`px-4 py-2 rounded-full text-sm font-bold shadow-sm transition-all duration-300 ${
                  filter === 'approved' 
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                Approved ({requests.filter(r => r.status === 'approved').length})
              </button>
              <button
                onClick={() => handleFilterChange('rejected')}
                className={`px-4 py-2 rounded-full text-sm font-bold shadow-sm transition-all duration-300 ${
                  filter === 'rejected' 
                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                Rejected ({requests.filter(r => r.status === 'rejected').length})
              </button>
            </div>
            
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input w-full rounded-full border-2 border-primary-200 focus:border-primary-500 focus:ring-primary-500 pl-10"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          {filteredRequests.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <div className="flex flex-col items-center justify-center">
                <svg className="h-16 w-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No match requests found</h3>
                <p className="text-gray-600">
                  Try adjusting your filters or search term.
                </p>
              </div>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                    Adopter
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                    Pet
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                    Match Score
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                    Date
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
                {filteredRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div>
                        <div className="text-lg font-bold text-gray-900">{request.adopterName}</div>
                        <div className="text-sm text-gray-600">{request.adopterEmail}</div>
                        <div className="text-sm text-gray-600">{request.adopterPhone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="text-lg font-medium text-gray-900">{request.petName}</div>
                      <div className="text-sm text-gray-600">{request.petType}</div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-lg font-bold text-gray-900 mr-3">{request.matchScore}%</div>
                        <div className="w-24 bg-gray-200 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full ${getMatchScoreColor(request.matchScore)}`}
                            style={{ width: `${request.matchScore}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-lg text-gray-600">
                      {new Date(request.requestDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-sm leading-5 font-bold rounded-full ${getStatusColor(request.status)}`}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => openRequestDetails(request)}
                        className="text-primary-600 hover:text-primary-900 mr-4 transition-colors duration-200 font-bold"
                      >
                        View
                      </button>
                      {request.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(request.id, 'approved')}
                            className="text-green-600 hover:text-green-900 mr-4 transition-colors duration-200 font-bold"
                            title="Approve request"
                          >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                          </button>
                          <button
                            onClick={() => handleStatusChange(request.id, 'rejected')}
                            className="text-red-600 hover:text-red-900 transition-colors duration-200 font-bold"
                            title="Reject request"
                          >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      
      {/* Stats Summary */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="feature-card bg-gradient-to-br from-white to-blue-50 p-5 border border-blue-100">
          <div className="text-sm font-medium text-gray-700">Total Requests</div>
          <div className="text-3xl font-bold text-gray-900 mt-2">{requests.length}</div>
        </div>
        <div className="feature-card bg-gradient-to-br from-white to-yellow-50 p-5 border border-yellow-100">
          <div className="text-sm font-medium text-gray-700">Pending</div>
          <div className="text-3xl font-bold text-yellow-600 mt-2">{requests.filter(r => r.status === 'pending').length}</div>
        </div>
        <div className="feature-card bg-gradient-to-br from-white to-green-50 p-5 border border-green-100">
          <div className="text-sm font-medium text-gray-700">Approved</div>
          <div className="text-3xl font-bold text-green-600 mt-2">{requests.filter(r => r.status === 'approved').length}</div>
        </div>
        <div className="feature-card bg-gradient-to-br from-white to-red-50 p-5 border border-red-100">
          <div className="text-sm font-medium text-gray-700">Rejected</div>
          <div className="text-3xl font-bold text-red-600 mt-2">{requests.filter(r => r.status === 'rejected').length}</div>
        </div>
      </div>
      
      {/* Request Details Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-70 overflow-y-auto h-full w-full z-50 backdrop-blur-sm">
          <div className="relative top-10 mx-auto p-6 border-0 w-11/12 md:w-3/4 lg:w-1/2 shadow-2xl rounded-2xl bg-gradient-to-br from-white to-primary-50">
            <div className="mt-3">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-3xl font-bold text-gray-900">
                  Adoption Request Details
                </h3>
                <button
                  onClick={closeRequestDetails}
                  className="text-gray-400 hover:text-gray-600 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              <div className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="feature-card bg-white p-5">
                    <h4 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-primary-200">Adopter Information</h4>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Name</p>
                        <p className="text-lg font-bold text-gray-900">{selectedRequest.adopterName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="text-lg font-medium text-gray-900">{selectedRequest.adopterEmail}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="text-lg font-medium text-gray-900">{selectedRequest.adopterPhone}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="feature-card bg-white p-5">
                    <h4 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-primary-200">Pet Information</h4>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Pet Name</p>
                        <p className="text-lg font-bold text-gray-900">{selectedRequest.petName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Pet Type</p>
                        <p className="text-lg font-medium text-gray-900">{selectedRequest.petType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Match Score</p>
                        <div className="flex items-center">
                          <span className="text-lg font-bold text-gray-900 mr-3">{selectedRequest.matchScore}%</span>
                          <div className="w-24 bg-gray-200 rounded-full h-3">
                            <div 
                              className={`h-3 rounded-full ${getMatchScoreColor(selectedRequest.matchScore)}`}
                              style={{ width: `${selectedRequest.matchScore}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="feature-card bg-white p-5 mb-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-primary-200">Request Details</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Request Date</p>
                      <p className="text-lg font-medium text-gray-900">
                        {new Date(selectedRequest.requestDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Status</p>
                      <span className={`px-3 py-1 inline-flex text-sm leading-5 font-bold rounded-full ${getStatusColor(selectedRequest.status)}`}>
                        {selectedRequest.status.charAt(0).toUpperCase() + selectedRequest.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="feature-card bg-white p-5">
                  <h4 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-primary-200">Adopter's Message</h4>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {selectedRequest.message}
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                <button
                  onClick={closeRequestDetails}
                  className="btn bg-gray-200 text-gray-800 hover:bg-gray-300 px-6 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Close
                </button>
                {selectedRequest.status === 'pending' && (
                  <>
                    <button
                      onClick={() => {
                        handleStatusChange(selectedRequest.id, 'rejected');
                        closeRequestDetails();
                      }}
                      className="btn bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 px-6 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Reject Request
                    </button>
                    <button
                      onClick={() => {
                        handleStatusChange(selectedRequest.id, 'approved');
                        closeRequestDetails();
                      }}
                      className="btn bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 px-6 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Approve Request
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchRequests;