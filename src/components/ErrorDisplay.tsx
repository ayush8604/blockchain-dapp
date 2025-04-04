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
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70 transition-opacity duration-300" style={{ opacity: visible ? 1 : 0 }}>
      <div className="max-w-md w-full mx-4" style={{ backgroundColor: '#112724c7', borderRadius: '0.75rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
        {/* Header */}
        <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'white', margin: 0 }}>Transaction Error</h3>
          <button 
            onClick={() => setVisible(false)} 
            style={{ background: 'transparent', border: 'none', color: '#9ca3af', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>
        
        {/* Body */}
        <div style={{ padding: '1.25rem', backgroundColor: '#14352f' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <div style={{ flexShrink: 0, paddingTop: '0.125rem' }}>
              <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '1.5rem', width: '1.5rem', color: '#5f9ea0' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div style={{ marginLeft: '0.75rem' }}>
              <p style={{ fontSize: '0.875rem', color: '#d1d5db', margin: 0 }}>{formatErrorMessage(error)}</p>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div style={{ padding: '0.75rem 1rem', backgroundColor: '#112724c7', borderTop: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="button"
            style={{ 
              backgroundColor: '#5f9ea0', 
              color: 'white', 
              border: 'none', 
              borderRadius: '0.375rem', 
              padding: '0.5rem 1rem', 
              fontSize: '0.875rem', 
              fontWeight: 500,
              cursor: 'pointer'
            }}
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