import React, { useState } from 'react';

const LifestyleQuiz = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  
  const questions = [
    {
      id: 'housing',
      question: 'What type of housing do you live in?',
      description: 'This helps us understand the space and environment you can provide for a pet.',
      options: ['Apartment', 'House with yard', 'House without yard', 'Farm'],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
        </svg>
      )
    },
    {
      id: 'housingSize',
      question: 'How large is your living space?',
      description: 'Larger pets may need more space to move around comfortably.',
      options: ['Small (under 800 sq ft)', 'Medium (800-1500 sq ft)', 'Large (1500-2500 sq ft)', 'Very Large (over 2500 sq ft)'],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"></path>
        </svg>
      )
    },
    {
      id: 'activity',
      question: 'How active is your lifestyle?',
      description: 'Active pets need owners who can keep up with their energy levels.',
      options: ['Very active (daily exercise)', 'Moderately active (3-4 times a week)', 'Somewhat active (1-2 times a week)', 'Not very active'],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
      )
    },
    {
      id: 'time',
      question: 'How much time can you dedicate to a pet daily?',
      description: 'Pets need daily care, attention, and interaction.',
      options: ['Less than 1 hour', '1-2 hours', '2-4 hours', 'More than 4 hours'],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      )
    },
    {
      id: 'experience',
      question: 'What is your experience with pets?',
      description: 'Experience level helps match you with a pet that suits your skills.',
      options: ['First-time owner', 'Some experience', 'Experienced owner', 'Very experienced'],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
        </svg>
      )
    },
    {
      id: 'petType',
      question: 'What type of pet are you looking for?',
      description: 'Different pets have different care requirements and personalities.',
      options: ['Dog', 'Cat', 'Either', 'Other (rabbit, bird, etc.)'],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      )
    },
    {
      id: 'petSize',
      question: 'What size pet do you prefer?',
      description: 'Size affects space needs, exercise requirements, and care complexity.',
      options: ['Small', 'Medium', 'Large', 'No preference'],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path>
        </svg>
      )
    },
    {
      id: 'petAge',
      question: 'What age pet are you looking for?',
      description: 'Age affects energy level, training needs, and life stage considerations.',
      options: ['Puppy/Kitten', 'Young adult', 'Adult', 'Senior'],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      )
    },
    {
      id: 'children',
      question: 'Do you have children in your home?',
      description: 'Some pets are better suited for homes with children.',
      options: ['No', 'Yes, under 5 years', 'Yes, 5-12 years', 'Yes, over 12 years'],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
      )
    },
    {
      id: 'otherPets',
      question: 'Do you have other pets?',
      description: 'Compatibility with existing pets is important for a smooth introduction.',
      options: ['No', 'Yes, dogs', 'Yes, cats', 'Yes, other pets'],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
        </svg>
      )
    },
    {
      id: 'allergies',
      question: 'Does anyone in your household have pet allergies?',
      description: 'Allergies can affect which pets are suitable for your home.',
      options: ['No', 'Yes, mild allergies', 'Yes, moderate allergies', 'Yes, severe allergies'],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
        </svg>
      )
    },
    {
      id: 'travel',
      question: 'How often do you travel?',
      description: 'Frequent travel may require special arrangements for pet care.',
      options: ['Rarely', 'Occasionally (1-2 times a year)', 'Frequently (3-5 times a year)', 'Very frequently (more than 5 times a year)'],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      )
    },
    {
      id: 'budget',
      question: 'What is your monthly budget for pet expenses?',
      description: 'Pets require ongoing expenses for food, medical care, and supplies.',
      options: ['Under $50', '$50-$100', '$100-$200', 'Over $200'],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      )
    },
    {
      id: 'grooming',
      question: 'How much time are you willing to spend on grooming?',
      description: 'Different pets have varying grooming needs and maintenance requirements.',
      options: ['Minimal', 'Some', 'Moderate', 'Significant'],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
        </svg>
      )
    },
    {
      id: 'training',
      question: 'How much time can you dedicate to training?',
      description: 'Training is important for a well-behaved pet and a harmonious household.',
      options: ['Minimal', 'Some', 'Moderate', 'Significant'],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
      )
    }
  ];
  
  const handleAnswer = (answer) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: answer };
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onComplete(newAnswers);
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;
  
  // Function to get progress color based on completion
  const getProgressColor = () => {
    if (progressPercentage < 30) return 'bg-red-500';
    if (progressPercentage < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-gradient-to-br from-white to-primary-50 rounded-2xl shadow-xl p-8 border border-primary-100">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-bold text-primary-800">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-lg font-bold text-accent-600">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className={`h-4 rounded-full transition-all duration-700 ease-in-out ${getProgressColor()}`} 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
        
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6 text-primary-600">
            {questions[currentQuestion].icon}
          </div>
          <h2 className="text-2xl font-bold mb-3 text-gray-900">
            {questions[currentQuestion].question}
          </h2>
          <p className="text-gray-600 text-lg">
            {questions[currentQuestion].description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className="feature-card text-left p-5 border-2 border-transparent hover:border-primary-300 transition-all duration-300 flex items-start"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center mr-4 mt-1">
                <span className="text-sm font-bold text-primary-600">{index + 1}</span>
              </div>
              <span className="font-medium text-gray-800 text-lg">{option}</span>
            </button>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`btn px-6 py-3 rounded-full font-bold ${
              currentQuestion === 0 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Previous
          </button>
          
          <div className="text-lg font-bold text-primary-600">
            {currentQuestion + 1} of {questions.length}
          </div>
          
          <button
            onClick={() => {
              // Skip question functionality
              handleAnswer('Not sure');
            }}
            className="btn bg-accent-500 text-white hover:bg-accent-600 px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl"
          >
            Skip
          </button>
        </div>
      </div>
      
      <div className="mt-6 text-center text-gray-600">
        Your answers help us find the perfect pet match for your lifestyle.
      </div>
    </div>
  );
};

export default LifestyleQuiz;