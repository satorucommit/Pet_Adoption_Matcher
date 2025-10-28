import React, { useState } from 'react';
import LifestyleQuiz from '../components/adopter/LifestyleQuiz';
import PetMatchResults from '../components/adopter/PetMatchResults';

const AdopterPage = () => {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [userPreferences, setUserPreferences] = useState({});

  const handleQuizComplete = (preferences) => {
    setUserPreferences(preferences);
    setQuizCompleted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Find Your Perfect Pet
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Take our lifestyle quiz to get personalized pet recommendations that match your family's needs
        </p>
        <div className="flex justify-center space-x-4 mt-6">
          <div className="text-4xl">🐕</div>
          <div className="text-4xl">🐈</div>
        </div>
      </div>

      {!quizCompleted ? (
        <LifestyleQuiz onComplete={handleQuizComplete} />
      ) : (
        <PetMatchResults userPreferences={userPreferences} />
      )}
    </div>
  );
};

export default AdopterPage;
