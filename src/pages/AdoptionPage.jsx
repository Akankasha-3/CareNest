import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AdoptionPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentPage="Adoption" />
      
      <div className="relative bg-secondary py-16">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Adoption Services</h1>
          <p className="max-w-2xl mx-auto text-white text-lg">
            Helping children find loving homes and supporting families through the adoption journey.
          </p>
        </div>
      </div>
      
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold mb-8 text-center text-primary">Featured Children for Adoption</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[{
              name: 'Aarav', age: 6, location: 'Chennai', story: 'Aarav loves drawing and dreams of being an artist.'
            }, {
              name: 'Meera', age: 4, location: 'Bangalore', story: 'Meera is cheerful and enjoys playing with her friends.'
            }, {
              name: 'Rohan', age: 8, location: 'Hyderabad', story: 'Rohan is curious and loves reading adventure books.'
            }].map(child => (
              <div key={child.name} className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center transition-transform hover:scale-105">
                <div className="w-24 h-24 bg-primary bg-opacity-10 rounded-full mb-4 flex items-center justify-center text-3xl font-bold text-primary">
                  {child.name[0]}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-primary">{child.name}</h3>
                <p className="text-gray-700 mb-1">Age: <span className="font-medium">{child.age}</span></p>
                <p className="text-gray-700 mb-1">Location: <span className="font-medium">{child.location}</span></p>
                <p className="text-gray-500 text-sm mt-2 text-center">{child.story}</p>
              </div>
            ))}
          </div>
        </div>
      
      <Footer />
    </div>
  );
};

export default AdoptionPage;