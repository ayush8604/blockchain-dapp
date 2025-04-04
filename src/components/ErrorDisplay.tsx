import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { setError } from '../redux/walletSlice';

const ErrorDisplay: React.FC = () => {
  // Type assertion to help TypeScript understand the state shape
  const error = useSelector((state: RootState) => (state as any).wallet.error);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  // Format blockchain error message for better readability
  const formatErrorMessage = (message: string) => {
    if (!message) return '';
    
    // Check if it's a blockchain revert exception
    if (message.includes('CALL_EXCEPTION') || message.includes('revert')) {
      return 'Smart Contract Error: The transaction was reverted by the blockchain. This might be due to contract conditions not being met.';
    }
    
    return message;
  };

  useEffect(() => {
    if (error) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        // Clear the error after animation finishes
        setTimeout(() => dispatch(setError(null)), 300);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  if (!error) return null;

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="bg-gray-800 border border-blue-500 rounded-lg shadow-lg max-w-md w-full mx-4 overflow-hidden">
        <div className="border-b border-blue-500 bg-gray-900 px-4 py-2 flex justify-between items-center">
          <h3 className="text-lg font-medium text-blue-400">Transaction Error</h3>
          <button 
            onClick={() => setVisible(false)} 
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-300">{formatErrorMessage(error)}</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-900 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={() => setVisible(false)}
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplay; 