import React, { useEffect, useState } from 'react';
import useCounter from '../hooks/useCounter';
import useWallet from '../hooks/useWallet';
import { TESTNET_IDS, isValidNetworkId } from '../contracts/contracts';

const Counter: React.FC = () => {
  const { count, loading, getCount, increment, decrement } = useCounter();
  const { isConnected, chainId, connectWallet } = useWallet();
  const [showConnectMessage, setShowConnectMessage] = useState(false);

  // Get the initial count when the component mounts or wallet connects
  useEffect(() => {
    if (isConnected) {
      getCount();
      setShowConnectMessage(false);
    }
  }, [isConnected, getCount]);

  // Handle counter increment
  const handleIncrement = async () => {
    if (!isConnected) {
      setShowConnectMessage(true);
      return;
    }
    
    await increment();
  };

  // Handle counter decrement
  const handleDecrement = async () => {
    if (!isConnected) {
      setShowConnectMessage(true);
      return;
    }
    
    await decrement();
  };

  // Handle refresh counter
  const handleRefresh = async () => {
    if (!isConnected) {
      setShowConnectMessage(true);
      return;
    }
    
    await getCount();
  };

  // Check if the connected network is a testnet or local network
  const isTestnetOrLocal = () => {
    if (!chainId) return false;
    return isValidNetworkId(chainId) && TESTNET_IDS.includes(chainId);
  };

  return (
    <div className="card w-96 bg-base-200 shadow-xl mx-auto">
      <div className="card-body items-center text-center">
        <h2 className="card-title">Smart Contract Counter</h2>
        
        {isTestnetOrLocal() && (
          <div className="bg-blue-900 bg-opacity-50 p-2 rounded-md text-sm text-blue-100 mb-4">
            <p>You are connected to a test network. Contract interactions won't affect mainnet.</p>
          </div>
        )}
        
        {showConnectMessage && !isConnected && (
          <div className="bg-gray-800 border border-gray-600 p-4 rounded-md text-sm text-gray-300 my-4 w-full max-w-xs mx-auto">
            <p className="font-bold mb-2 text-center">Wallet Disconnected</p>
            <p className="mb-3 text-center">Please connect your wallet to interact with the smart contract.</p>
            <div className="flex justify-center">
              <button 
                onClick={connectWallet} 
                className="bg-black hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-md text-sm transition duration-150"
              >
                Connect Wallet
              </button>
            </div>
          </div>
        )}
        
        <div className="flex flex-col items-center my-4">
          <span className="text-4xl font-bold mb-2">
            {loading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : count !== null ? (
              count
            ) : (
              'N/A'
            )}
          </span>
          <p className="text-sm opacity-70">Current Count</p>
        </div>
        
        <div className="card-actions justify-center space-x-2">
          <button 
            className="btn btn-primary" 
            onClick={handleIncrement}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Incrementing...
              </>
            ) : (
              'Increment'
            )}
          </button>
          
          <button 
            className="btn btn-secondary" 
            onClick={handleDecrement}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Decrementing...
              </>
            ) : (
              'Decrement'
            )}
          </button>
          
          <button 
            className="btn btn-outline" 
            onClick={handleRefresh}
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
            )}
          </button>
        </div>
        
        <div className="mt-4 text-xs opacity-70">
          <p>This interacts with a Counter smart contract deployed on the blockchain.</p>
          <p>Each transaction will require confirmation in your wallet.</p>
        </div>
      </div>
    </div>
  );
};

export default Counter; 