import React from 'react';

const AboutPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          About PetMatch
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Connecting loving families with their perfect furry companions through smart matching technology
        </p>
        <div className="flex justify-center space-x-8">
          <div className="text-6xl">🐕</div>
          <div className="text-6xl">🐈</div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-3xl p-8 md:p-12 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-6">
              At PetMatch, we believe every pet deserves a loving home and every family deserves 
              the perfect companion. Our mission is to revolutionize pet adoption by using 
              advanced matching algorithms that consider both pet needs and family lifestyles.
            </p>
            <p className="text-lg text-gray-700">
              We work directly with shelters and rescue organizations to help pets find their 
              forever homes faster, while ensuring families make informed decisions about pet 
              adoption that will last a lifetime.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full blur-xl opacity-30"></div>
              <div className="relative bg-white rounded-full p-8 shadow-xl">
                <div className="text-8xl">🐾</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How PetMatch Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "Take the Quiz",
              description: "Complete our comprehensive lifestyle quiz to help us understand your preferences and living situation",
              icon: "📝"
            },
            {
              title: "Get Matched",
              description: "Our algorithm analyzes your responses and matches you with pets that fit your lifestyle",
              icon: "🤖"
            },
            {
              title: "Meet Your Matches",
              description: "Browse through your personalized pet matches with detailed profiles and photos",
              icon: "🐶"
            },
            {
              title: "Find Your Forever Friend",
              description: "Connect with shelters to meet your potential new family member",
              icon: "❤️"
            }
          ].map((step, index) => (
            <div key={index} className="text-center feature-card">
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Sarah Johnson",
              role: "Founder & CEO",
              bio: "Passionate animal lover with 10+ years in pet rescue operations",
              image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
            },
            {
              name: "Michael Chen",
              role: "Lead Developer",
              bio: "Tech expert dedicated to creating innovative solutions for pet adoption",
              image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
            },
            {
              name: "Emma Rodriguez",
              role: "Animal Behaviorist",
              bio: "Certified animal behavior specialist ensuring perfect pet-family matches",
              image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
            }
          ].map((member, index) => (
            <div key={index} className="text-center">
              <img 
                src={member.image} 
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
              <p className="text-primary-600 mb-2">{member.role}</p>
              <p className="text-gray-600">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-900 text-white rounded-3xl p-8 md:p-12 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: "5000+", label: "Pets Matched" },
            { number: "50+", label: "Partner Shelters" },
            { number: "95%", label: "Success Rate" },
            { number: "24/7", label: "Support" }
          ].map((stat, index) => (
            <div key={index}>
              <div className="text-3xl md:text-4xl font-bold text-primary-400 mb-2">{stat.number}</div>
              <div className="text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;