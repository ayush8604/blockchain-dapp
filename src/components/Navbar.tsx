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
    <div className="navbar bg-base-300 shadow-lg">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost normal-case text-xl">Blockchain dApp</a>
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
                  className="text-sm font-bold hover:text-blue-400"
                >
                  {formatAddress(address)}
                </a>
                {isTestnet() && (
                  <span className="bg-yellow-500 text-black text-xs px-2 py-0.5 rounded-full ml-2">
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
            className="btn btn-primary btn-sm"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar; 