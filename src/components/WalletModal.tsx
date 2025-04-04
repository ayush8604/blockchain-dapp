import React, { useState } from 'react';
import useWallet from '../hooks/useWallet';

type WalletType = 'Metamask' | 'Coinbase' | 'Core' | 'WalletConnect';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose }) => {
  const { connectWallet } = useWallet();
  const [selectedNetwork, setSelectedNetwork] = useState<string>('Ethereum');

  const handleConnectWallet = async (walletType: WalletType) => {
    await connectWallet();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80" onClick={onClose}>
      <div 
        className="relative w-full max-w-md p-6 rounded-xl bg-[#112724c7] border border-gray-800" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-8">
          <button className="text-gray-400 p-1 rounded-full hover:bg-gray-800 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          <h2 className="text-2xl font-bold text-white">Connect Wallet</h2>
          <button 
            className="text-gray-400 p-1 rounded-full hover:bg-gray-800 transition-colors"
            onClick={onClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex justify-center mb-8 space-x-2">
          <button
            className={`py-2 px-5 rounded-full blockchain-option ${selectedNetwork === 'Ethereum' ? 'active' : ''}`}
            onClick={() => setSelectedNetwork('Ethereum')}
          >
            Ethereum
          </button>
          <button
            className={`py-2 px-5 rounded-full blockchain-option ${selectedNetwork === 'Solana' ? 'active' : ''}`}
            onClick={() => setSelectedNetwork('Solana')}
          >
            Solana
          </button>
          <button
            className={`py-2 px-5 rounded-full blockchain-option ${selectedNetwork === 'Bitcoin' ? 'active' : ''}`}
            onClick={() => setSelectedNetwork('Bitcoin')}
          >
            Bitcoin
          </button>
        </div>

        <div className="space-y-3 mb-6">
          <button
            onClick={() => handleConnectWallet('Metamask')}
            className="wallet-option"
          >
            <span className="font-medium text-white">Metamask</span>
            <img src="https://metamask.io/images/metamask-fox.svg" alt="Metamask" className="h-8 w-8" />
          </button>
          
          <button
            onClick={() => handleConnectWallet('Coinbase')}
            className="wallet-option"
          >
            <span className="font-medium text-white">Coinbase</span>
            <div className="h-8 w-8 bg-[#0052FF] rounded-md flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#0052FF"/>
                <path d="M12.0001 4.80005C8.02995 4.80005 4.8 8.03 4.8 12.0001C4.8 15.9703 8.02995 19.2002 12.0001 19.2002C15.9702 19.2002 19.2001 15.9703 19.2001 12.0001C19.2001 8.03 15.9702 4.80005 12.0001 4.80005ZM9.6001 14.6515V9.34865C9.6001 9.15761 9.80013 9.03191 9.96617 9.12891L15.2657 11.7803C15.4221 11.8716 15.4221 12.1286 15.2657 12.2199L9.96617 14.8713C9.80013 14.9683 9.6001 14.8426 9.6001 14.6515Z" fill="white"/>
              </svg>
            </div>
          </button>
          
          <button
            onClick={() => handleConnectWallet('Core')}
            className="wallet-option"
          >
            <span className="font-medium text-white">Core</span>
            <div className="h-8 w-8 bg-black rounded-full flex items-center justify-center overflow-hidden">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="black"/>
                <path d="M9.87868 14.1213C11.0503 15.2929 12.9497 15.2929 14.1213 14.1213C15.2929 12.9497 15.2929 11.0503 14.1213 9.87868C12.9497 8.70711 11.0503 8.70711 9.87868 9.87868C8.70711 11.0503 8.70711 12.9497 9.87868 14.1213Z" fill="white"/>
              </svg>
            </div>
          </button>
          
          <button
            onClick={() => handleConnectWallet('WalletConnect')}
            className="wallet-option"
          >
            <span className="font-medium text-white">Wallet Connect</span>
            <div className="h-8 w-8 bg-[#3b99fc] rounded-md flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.2 11.7C8.95 10 11.55 10 13.3 11.7L13.45 11.85C13.55 11.95 13.7 11.95 13.8 11.85L14.5 11.15C14.6 11.05 14.6 10.9 14.5 10.8L14.3 10.6C11.85 8.25 8.65 8.25 6.2 10.6L6 10.8C5.9 10.9 5.9 11.05 6 11.15L6.7 11.85C6.8 11.95 6.95 11.95 7.05 11.85L7.2 11.7ZM16.3 15.1L17 14.4C17.1 14.3 17.1 14.15 17 14.05L12.95 10.1C12.85 10 12.7 10 12.6 10.1L8.55 14.05C8.45 14.15 8.45 14.3 8.55 14.4L9.25 15.1C9.35 15.2 9.5 15.2 9.6 15.1L12.6 12.1C12.7 12 12.85 12 12.95 12.1L15.95 15.1C16.05 15.2 16.2 15.2 16.3 15.1Z" fill="white"/>
              </svg>
            </div>
          </button>
        </div>

        <div className="pt-6 border-t border-gray-800 flex items-center justify-center">
          <button className="flex items-center text-white text-sm hover:text-gray-300 transition-colors">
            <svg className="w-6 h-6 mr-2" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="24" rx="4" fill="#1A1A1A"/>
              <path d="M12 7V17M7 12H17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>I don't have a wallet</span>
          </button>
        </div>
        
        <div className="mt-8 pt-4 border-t border-gray-800 flex items-center justify-center text-xs text-gray-500">
          <span>Powered by</span>
          <svg className="h-4 w-4 mx-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#1A1A1A"/>
            <path d="M7.2 11.7C8.95 10 11.55 10 13.3 11.7L13.45 11.85C13.55 11.95 13.7 11.95 13.8 11.85L14.5 11.15C14.6 11.05 14.6 10.9 14.5 10.8L14.3 10.6C11.85 8.25 8.65 8.25 6.2 10.6L6 10.8C5.9 10.9 5.9 11.05 6 11.15L6.7 11.85C6.8 11.95 6.95 11.95 7.05 11.85L7.2 11.7Z" fill="#999999"/>
          </svg>
          <span>&</span>
          <span className="ml-2">LIFI</span>
        </div>
      </div>
    </div>
  );
};

export default WalletModal; 