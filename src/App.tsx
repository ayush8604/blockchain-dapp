import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Counter from './components/Counter';
import ErrorDisplay from './components/ErrorDisplay';
import TransactionHistory from './components/TransactionHistory';
import HomePage from './components/HomePage';
import SuccessNotification from './components/SuccessNotification';
import useWallet from './hooks/useWallet';

function App() {
  const { isConnected } = useWallet();
  const [showCounterPage, setShowCounterPage] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [prevConnected, setPrevConnected] = useState(false);
  
  // Effect to handle transitions between pages based on wallet connection
  useEffect(() => {
    // When wallet connects and wasn't connected before
    if (isConnected && !prevConnected) {
      setShowSuccess(true);
      
      // Set a timer to change to counter page after notification
      const timer = setTimeout(() => {
        setShowCounterPage(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
    
    // Update previous connection state
    setPrevConnected(isConnected);
  }, [isConnected, prevConnected]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-base-content">
      {/* Only show Navbar on the counter page */}
      {showCounterPage && <Navbar />}
      <ErrorDisplay />
      <SuccessNotification 
        show={showSuccess} 
        onClose={() => setShowSuccess(false)} 
      />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        {!showCounterPage ? (
          // Home page with centered connect wallet button only
          <HomePage />
        ) : (
          // Counter page with dApp functionality
          <div className="pt-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-white">Blockchain dApp Frontend Task</h1>
            
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 gap-6">
                <Counter />
                <TransactionHistory />
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* <footer className="footer footer-center p-4 bg-base-300 text-base-content mt-auto">
        <div>
          <p>© 2023 - Blockchain dApp Frontend Integration Task</p>
        </div>
      </footer> */}
    </div>
  );
}

export default App;
