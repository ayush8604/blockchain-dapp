import React from 'react';
import useWallet from '../hooks/useWallet';

const HomePage: React.FC = () => {
  const { connectWallet } = useWallet();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#112724c7] px-4 sm:px-6 md:px-8 -mt-16">
      <div className="text-center mb-6 md:mb-10 px-4 max-w-full">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 md:mb-4">Blockchain dAPP_</h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-xs sm:max-w-sm md:max-w-lg mx-auto">
          Connect your wallet to interact with decentralized applications
        </p>
      </div>
      
      <div className="bg-[#14352f] rounded-lg shadow-xl p-5 sm:p-6 md:p-8 w-full max-w-xs sm:max-w-sm md:max-w-md border border-gray-800">
        <div className="flex flex-col items-center">
          <div className="mb-4 sm:mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 text-[#5f9ea0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 md:mb-4">Secure Blockchain Connection</h2>
          <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 text-center">
            Connect your wallet to access decentralized applications and interact with smart contracts.
          </p>
          <button 
            onClick={connectWallet} 
            className="w-full bg-[#5f9ea0] hover:bg-[#4f8a8b] font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition duration-200 flex items-center justify-center"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Connect wallet
          </button>
        </div>
      </div>
      
      <div className="mt-6 md:mt-8 text-gray-400 text-xs sm:text-sm">
        <p>Powered by <span className="text-[#5f9ea0]">Ethereum</span> & React</p>
      </div>
    </div>
  );
};

export default HomePage; 