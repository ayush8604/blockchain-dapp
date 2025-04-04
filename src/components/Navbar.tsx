import React from 'react';
import useWallet from '../hooks/useWallet';
import { NETWORK_METADATA, NETWORK_IDS, isValidNetworkId, TESTNET_IDS } from '../contracts/contracts';

const Navbar: React.FC = () => {
  const { 
    isConnected, 
    address, 
    balance, 
    chainId,
    connectWallet, 
    disconnectWallet, 
    getNetworkName 
  } = useWallet();

  // Format the address to display first and last 4 characters
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Format balance to display only 4 decimal places
  const formatBalance = (balance: string) => {
    return parseFloat(balance).toFixed(4);
  };

  // Get currency symbol based on network
  const getCurrencySymbol = () => {
    if (!chainId) return 'ETH';
    
    const networkData = isValidNetworkId(chainId)
      ? NETWORK_METADATA[chainId]
      : NETWORK_METADATA[NETWORK_IDS.ETHEREUM_MAINNET];
      
    return networkData.currencySymbol;
  };

  // Get block explorer link for the current network
  const getBlockExplorerLink = (address: string) => {
    if (!chainId) return '#';
    
    const networkData = isValidNetworkId(chainId)
      ? NETWORK_METADATA[chainId]
      : NETWORK_METADATA[NETWORK_IDS.ETHEREUM_MAINNET];
      
    if (!networkData.blockExplorer) return '#';
    return `${networkData.blockExplorer}/address/${address}`;
  };

  // Add a warning badge if we're on a testnet
  const isTestnet = () => {
    if (!chainId) return false;
    return isValidNetworkId(chainId) && TESTNET_IDS.includes(chainId);
  };

  return (
    <div className="navbar bg-[#112724c7] shadow-lg border-b border-gray-800">
      <div className="flex-1">
        <a href="/" className="text-xl font-semibold text-white opacity-90">BLOCKCHAIN dAPP_</a>
      </div>
      <div className="flex-none">
        {isConnected && address ? (
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-end mr-2">
              <div className="flex items-center">
                <a 
                  href={getBlockExplorerLink(address)} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm font-bold hover:text-[#5f9ea0]"
                >
                  {formatAddress(address)}
                </a>
                {isTestnet() && (
                  <span className="bg-[#5f9ea0] bg-opacity-20 text-[#5f9ea0] text-xs px-2 py-0.5 rounded-full ml-2">
                    Testnet
                  </span>
                )}
              </div>
              <span className="text-xs opacity-70">{getNetworkName()}</span>
              {balance && (
                <span className="text-xs opacity-70">
                  {formatBalance(balance)} {getCurrencySymbol()}
                </span>
              )}
            </div>
            <button onClick={disconnectWallet} className="btn btn-error btn-sm">
              Disconnect
            </button>
          </div>
        ) : (
          <button 
            onClick={connectWallet} 
            className="bg-[#112724C7] font-medium py-2 px-4 rounded-md transition duration-150"
          >
            Connect wallet
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar; 