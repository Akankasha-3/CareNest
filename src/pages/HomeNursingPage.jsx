import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Clock, Calendar, DollarSign, CheckCircle } from 'lucide-react';

const HomeNursingPage = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [duration, setDuration] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  
  const nursingServices = [
    {
      id: 'elderly',
      title: 'Elderly Care',
      description: 'Compassionate care for seniors including assistance with daily activities.',
      pricePerDay: 45,
      icon: <Clock size={24} />,
    },
    {
      id: 'postop',
      title: 'Post-Surgery Care',
      description: 'Specialized care for individuals recovering from surgery.',
      pricePerDay: 55,
      icon: <CheckCircle size={24} />,
    },
    {
      id: 'chronic',
      title: 'Chronic Illness Care',
      description: 'Ongoing support for individuals with chronic conditions.',
      pricePerDay: 50,
      icon: <CheckCircle size={24} />,
    },
    {
      id: 'disability',
      title: 'Disability Support',
      description: 'Assistance for individuals with disabilities.',
      pricePerDay: 48,
      icon: <CheckCircle size={24} />,
    },
  ];
  
  const calculateTotalPrice = () => {
    if (!selectedService) return 0;
    const service = nursingServices.find(s => s.id === selectedService);
    return service ? service.pricePerDay * duration : 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = `/payment?service=${selectedService}&duration=${duration}&total=${calculateTotalPrice()}`;
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentPage="Home-Nursing" />
      
      <div className="relative bg-primary py-16">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Professional Home-Nursing Services</h1>
          <p className="max-w-2xl mx-auto text-white text-lg">
            Our skilled and compassionate nursing professionals provide personalized care in the comfort of your home.
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Select a Home-Nursing Service</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {nursingServices.map((service) => (
                <div
                  key={service.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedService === service.id
                      ? 'border-primary shadow-md bg-primary bg-opacity-5'
                      : 'border-gray-200 hover:border-primary hover:shadow-sm'
                  }`}
                  onClick={() => setSelectedService(service.id)}
                >
                  <div className="flex items-center mb-2">
                    <div className="text-primary mr-2">{service.icon}</div>
                    <h3 className="text-lg font-semibold">{service.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                  <p className="text-primary font-semibold">${service.pricePerDay} / day</p>
                </div>
              ))}
            </div>
            
            {selectedService && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                    Duration (Days)
                  </label>
                  <div className="flex items-center">
                    <button
                      type="button"
                      className="px-3 py-2 bg-gray-200 rounded-l-md"
                      onClick={() => setDuration(Math.max(1, duration - 1))}
                    >
                      -
                    </button>
                    <input
                      id="duration"
                      type="number"
                      min="1"
                      value={duration}
                      onChange={(e) => setDuration(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-16 text-center border-y border-gray-200 py-2"
                    />
                    <button
                      type="button"
                      className="px-3 py-2 bg-gray-200 rounded-r-md"
                      onClick={() => setDuration(duration + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    id="date"
                    type="date"
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </form>
            )}
          </div>
          
          <div>
            <div className="bg-gray-50 rounded-lg p-6 sticky top-8">
              <h3 className="text-xl font-bold mb-4">Service Summary</h3>
              
              {selectedService ? (
                <>
                  <div className="border-b border-gray-200 pb-4 mb-4">
                    <p className="text-gray-600 mb-2">Selected Service:</p>
                    <p className="font-semibold">
                      {nursingServices.find(s => s.id === selectedService)?.title}
                    </p>
                  </div>
                  
                  <div className="border-b border-gray-200 pb-4 mb-4">
                    <p className="text-gray-600 mb-2">Duration:</p>
                    <p className="font-semibold">{duration} {duration === 1 ? 'day' : 'days'}</p>
                  </div>
                  
                  <div className="mb-6">
                    <p className="text-gray-600 mb-2">Total Price:</p>
                    <p className="text-xl font-bold text-primary">${calculateTotalPrice().toFixed(2)}</p>
                  </div>
                  
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-full bg-primary text-white py-3 px-4 rounded-md hover:bg-primary-dark transition-colors font-medium flex items-center justify-center"
                  >
                    <DollarSign size={18} className="mr-2" />
                    Proceed to Payment
                  </button>
                </>
              ) : (
                <p className="text-gray-500">Please select a service to see pricing details.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default HomeNursingPage;