import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Check, CreditCard, Calendar, Lock } from 'lucide-react';

const PaymentPage = () => {
  const [service, setService] = useState('');
  const [duration, setDuration] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentComplete, setPaymentComplete] = useState(false);
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const serviceParam = params.get('service');
    const durationParam = params.get('duration');
    const totalParam = params.get('total');
    
    if (serviceParam) setService(serviceParam);
    if (durationParam) setDuration(parseInt(durationParam || '0'));
    if (totalParam) setTotalAmount(parseFloat(totalParam || '0'));
  }, []);
  
  const handlePayment = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setPaymentComplete(true);
    }, 2000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentPage="" />
      
      <div className="flex-grow bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {!paymentComplete ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h1 className="text-2xl font-bold mb-6">Secure Payment</h1>
              
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-medium">{service}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{service === 'companionship' ? `${duration} sessions` : `${duration} days`}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t">
                    <span className="text-gray-800 font-semibold">Total Amount:</span>
                    <span className="text-primary font-bold">₹{totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <form onSubmit={handlePayment}>
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 rounded-md font-medium hover:bg-primary-dark transition-colors"
                >
                  Pay ₹{totalAmount.toFixed(2)}
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-6">
                <Check size={32} className="text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
              <p className="text-gray-600 mb-6">
                Thank you for your payment of ₹{totalAmount.toFixed(2)}.
              </p>
              <a
                href="/"
                className="px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-primary-dark transition-colors"
              >
                Return to Home
              </a>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PaymentPage;