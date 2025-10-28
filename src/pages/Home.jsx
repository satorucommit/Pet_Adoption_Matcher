import React from 'react';
import { Link } from 'react-router-dom';
import PetGallery from '../components/adopter/PetGallery';

const Home = () => {
  // Sample pets data
  const samplePets = [
    {
      id: 1,
      name: 'Buddy',
      type: 'Dog',
      breed: 'Golden Retriever',
      age: '2 years',
      size: 'Large',
      gender: 'Male',
      image: 'https://images.dog.ceo/breeds/retriever-golden/n02099601_1010.jpg',
      description: 'Friendly and energetic Golden Retriever who loves to play fetch and go for long walks.',
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
      description: 'Gentle and intelligent Labrador who enjoys swimming and cuddling.',
      price: 0
    },
    {
      id: 3,
      name: 'Whiskers',
      type: 'Cat',
      breed: 'Persian',
      age: '4 years',
      size: 'Medium',
      gender: 'Female',
      image: 'https://cdn2.thecatapi.com/images/123.jpg',
      description: 'Calm and affectionate Persian cat who enjoys lounging in sunny spots.',
      price: 0
    },
    {
      id: 4,
      name: 'Max',
      type: 'Dog',
      breed: 'Husky',
      age: '3 years',
      size: 'Large',
      gender: 'Male',
      image: 'https://images.dog.ceo/breeds/husky/n02110185_10844.jpg',
      description: 'Beautiful Siberian Husky with striking blue eyes who loves the outdoors.',
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
      description: 'Vocal and social Siamese cat who loves to interact with his humans.',
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
      description: 'Gentle giant of a Maine Coon who gets along well with children and other pets.',
      price: 0
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary-500 to-accent-500 rounded-3xl overflow-hidden mb-16">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Find Your Perfect <span className="block">Furry Companion</span>
            </h1>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl">
              Connect with loving pets waiting for their forever homes through our smart matching technology
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/adopter" 
                className="btn btn-primary text-lg px-8 py-4"
              >
                Start Matching
              </Link>
              <Link 
                to="/shelter" 
                className="btn btn-secondary text-lg px-8 py-4"
              >
                Shelter Login
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 hidden lg:block">
          <div className="text-9xl opacity-20 mr-8 mb-8">🐾</div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose PetMatch?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Smart Matching",
              description: "Our advanced algorithm matches pets with families based on lifestyle, preferences, and compatibility",
              icon: "🤖"
            },
            {
              title: "Verified Shelters",
              description: "We work exclusively with verified shelters and rescue organizations to ensure pet welfare",
              icon: "🏥"
            },
            {
              title: "Lifetime Support",
              description: "Get ongoing support and resources to help your new pet adjust to their forever home",
              icon: "❤️"
            }
          ].map((feature, index) => (
            <div key={index} className="text-center feature-card">
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gray-50 rounded-3xl p-8 md:p-12 mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How PetMatch Works</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                step: "01",
                title: "Take the Quiz",
                description: "Complete our comprehensive lifestyle quiz"
              },
              {
                step: "02",
                title: "Get Matched",
                description: "Receive personalized pet recommendations"
              },
              {
                step: "03",
                title: "Meet Your Match",
                description: "Connect with shelters to meet your potential pet"
              },
              {
                step: "04",
                title: "Welcome Home",
                description: "Bring your new family member home"
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-md">
                <div className="text-primary-600 font-bold text-lg mb-2">{item.step}</div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full blur-xl opacity-30"></div>
              <div className="relative bg-white rounded-full p-8 shadow-xl">
                <div className="text-8xl">🐶</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Pets */}
      <div className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Pets</h2>
          <Link to="/adopter" className="text-primary-600 hover:text-primary-700 font-medium">
            View All Pets →
          </Link>
        </div>
        <PetGallery pets={samplePets.slice(0, 3)} />
      </div>

      {/* Testimonials */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote: "PetMatch helped us find our perfect companion. Buddy has brought so much joy to our family!",
              author: "Sarah & Family",
              pet: "Buddy (Golden Retriever)"
            },
            {
              quote: "The matching process was so accurate. Luna fits our lifestyle perfectly and we couldn't be happier.",
              author: "Mike & Jessica",
              pet: "Luna (Labrador)"
            },
            {
              quote: "As a shelter, PetMatch has helped us place so many pets in loving homes. It's been a game-changer!",
              author: "Animal Rescue Center",
              pet: "50+ successful adoptions"
            }
          ].map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="text-yellow-400 text-2xl mb-4">★★★★★</div>
              <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
              <div className="font-bold text-gray-900">{testimonial.author}</div>
              <div className="text-primary-600">{testimonial.pet}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-3xl p-8 md:p-12 text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Find Your Perfect Pet?</h2>
        <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
          Join thousands of families who have found their perfect companions through PetMatch
        </p>
        <Link 
          to="/adopter" 
          className="btn btn-primary text-lg px-8 py-4"
        >
          Start Your Journey
        </Link>
      </div>
    </div>
  );
};

export default Home;