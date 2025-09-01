import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const companionshipServices = [
  {
    id: 'call',
    title: 'Companionship Call',
    description: 'Connect with a companion for a friendly phone call and emotional support.',
    price: 99,
  },
  {
    id: 'msg',
    title: 'Companionship Message',
    description: 'Exchange messages with a companion for ongoing support and encouragement.',
    price: 49,
  },
];

const providers = [
  {
    name: 'Priya Sharma', experience: '5 years', specialty: 'Senior Care', bio: 'Priya enjoys reading and is passionate about helping elders.'
  },
  {
    name: 'Rahul Verma', experience: '3 years', specialty: 'Child Care', bio: 'Rahul is energetic and loves playing board games with kids.'
  },
  {
    name: 'Anita Singh', experience: '7 years', specialty: 'Disability Support', bio: 'Anita is patient and skilled in providing emotional support.'
  }
];

const CompanionshipPage = () => {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentPage="Companionship" />
      <div className="relative bg-accent py-16">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Companionship Services</h1>
          <p className="max-w-2xl mx-auto text-white text-lg">
            Providing emotional support and meaningful connections through personalized services.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Select a Companionship Service</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {companionshipServices.map((service) => (
                <div
                  key={service.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedService === service.id
                      ? 'border-accent shadow-md bg-accent bg-opacity-5'
                      : 'border-gray-200 hover:border-accent hover:shadow-sm'
                  }`}
                  onClick={() => setSelectedService(service.id)}
                >
                  <div className="flex items-center mb-2">
                    <div className="text-accent mr-2">
                      {service.id === 'call' ? <span role="img" aria-label="call">📞</span> : <span role="img" aria-label="message">💬</span>}
                    </div>
                    <h3 className="text-lg font-semibold">{service.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                  <p className="text-accent font-semibold">₹{service.price}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="bg-gray-50 rounded-lg p-6 sticky top-8">
              <h3 className="text-xl font-bold mb-4">Service Summary</h3>
              {selectedService ? (
                <>
                  <div className="border-b border-gray-200 pb-4 mb-4">
                    <p className="text-gray-600 mb-2">Selected Service:</p>
                    <p className="font-semibold">
                      {companionshipServices.find(s => s.id === selectedService)?.title}
                    </p>
                  </div>
                  <div className="mb-6">
                    <p className="text-gray-600 mb-2">Price:</p>
                    <p className="text-xl font-bold text-accent">₹{companionshipServices.find(s => s.id === selectedService)?.price}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => window.location.href = `/payment?service=companionship&type=${selectedService}&price=${companionshipServices.find(s => s.id === selectedService)?.price}`}
                    className="w-full bg-accent text-white py-3 px-4 rounded-md hover:bg-accent-dark transition-colors font-medium flex items-center justify-center"
                  >
                    Proceed to Payment
                  </button>
                </>
              ) : (
                <p className="text-gray-500">Please select a service to see pricing details.</p>
              )}
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-8 text-center mt-16">Available Companionship Providers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12">
          {providers.map(provider => (
            <div key={provider.name} className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
              <div className="w-24 h-24 bg-accent bg-opacity-10 rounded-full mb-4 flex items-center justify-center text-3xl font-bold text-accent">
                {provider.name.split(' ')[0][0]}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-accent">{provider.name}</h3>
              <p className="text-gray-600 mb-1">Experience: {provider.experience}</p>
              <p className="text-gray-600 mb-1">Specialty: {provider.specialty}</p>
              <p className="text-gray-500 text-sm mt-2">{provider.bio}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CompanionshipPage;