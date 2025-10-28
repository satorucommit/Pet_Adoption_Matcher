import React, { useState, useEffect } from 'react';

const Preloader = ({ onLoadingComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Set timeout to hide preloader after 1.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Call the completion callback after the animation finishes
      setTimeout(() => {
        onLoadingComplete();
      }, 500); // Match this with the CSS transition duration
    }, 1500);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
      {/* Cloud elements */}
      <div className="absolute top-10 left-10 w-24 h-12 bg-white rounded-full opacity-30 animate-float"></div>
      <div className="absolute top-20 right-20 w-16 h-8 bg-white rounded-full opacity-20 animate-float animation-delay-400"></div>
      <div className="absolute bottom-20 left-20 w-20 h-10 bg-white rounded-full opacity-25 animate-float animation-delay-800"></div>
      <div className="absolute bottom-10 right-10 w-28 h-14 bg-white rounded-full opacity-20 animate-float animation-delay-600"></div>
      
      {/* Floating cloud particles */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-white rounded-full opacity-10 animate-pulse"></div>
      <div className="absolute top-3/4 right-1/3 w-3 h-3 bg-white rounded-full opacity-15 animate-pulse animation-delay-200"></div>
      <div className="absolute top-1/3 right-1/4 w-5 h-5 bg-white rounded-full opacity-10 animate-pulse animation-delay-600"></div>
      
      {/* Main content */}
      <div className="text-center z-10 animate-fade-in">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
            <div className="relative bg-white rounded-full p-6 shadow-xl">
              {/* Simple icon instead of animated pet */}
              <div className="w-20 h-20 flex items-center justify-center">
                <span className="text-4xl">🐶</span>
              </div>
            </div>
          </div>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4 animate-bounce-in">
          Welcome <span className="text-5xl">🐶</span>
        </h1>
        
        <div className="mt-8 flex justify-center">
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full overflow-hidden">
            <div className="h-full bg-white animate-pulse animation-delay-200"></div>
          </div>
        </div>
      </div>
      
      {/* Emerging effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-white opacity-0 animate-fade-out"></div>
    </div>
  );
};

export default Preloader;