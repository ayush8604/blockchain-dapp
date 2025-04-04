import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ethers } from 'ethers';
import { 
  setWalletConnected, 
  setWalletDisconnected, 
  updateBalance, 
  updateChainId,
  setError,
  addPendingTransaction,
  removePendingTransaction,
  addTransactionToHistory,
  updateTransactionStatus
} from '../redux/walletSlice';
import { RootState } from '../redux/store';

declare global {
  interface Window {
    ethereum: any;
  }
}

const useWallet = () => {
  const dispatch = useDispatch();
  const walletState = useSelector((state: RootState) => state.wallet);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);

  // Initialize wallet from localStorage if available
  useEffect(() => {
    const initWallet = async () => {
      if (window.ethereum && walletState.isConnected && walletState.address) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          setProvider(provider);
          
          // Check if we're still connected by getting accounts
          const accounts = await provider.listAccounts();
          if (accounts.length > 0) {
            const network = await provider.getNetwork();
            dispatch(setWalletConnected({
              address: accounts[0],
              chainId: network.chainId
            }));
            
            // Get balance
            const balance = await provider.getBalance(accounts[0]);
            dispatch(updateBalance(ethers.utils.formatEther(balance)));
          } else {
            // We're not connected, clear the state
            dispatch(setWalletDisconnected());
          }
        } catch (error) {
          console.error('Error initializing wallet:', error);
          dispatch(setWalletDisconnected());
        }
      }
    };

    initWallet();
  }, [dispatch, walletState.isConnected, walletState.address]);

  // Setup event listeners for Metamask
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected their wallet
          dispatch(setWalletDisconnected());
        } else if (walletState.address !== accounts[0].toLowerCase()) {
          // Account changed
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          setProvider(provider);
          
          provider.getNetwork().then((network) => {
            dispatch(setWalletConnected({
              address: accounts[0],
              chainId: network.chainId
            }));
            
            // Get balance
            provider.getBalance(accounts[0]).then((balance) => {
              dispatch(updateBalance(ethers.utils.formatEther(balance)));
            });
          });
        }
      };

      const handleChainChanged = (chainIdHex: string) => {
        // Convert from hex to decimal
        const chainId = parseInt(chainIdHex, 16);
        dispatch(updateChainId(chainId));
        
        // Reload the page to ensure we're using the correct chain
        window.location.reload();
      };

      const handleDisconnect = (error: { code: number; message: string }) => {
        dispatch(setWalletDisconnected());
        dispatch(setError(error.message));
      };

      // Subscribe to Metamask events
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
      window.ethereum.on('disconnect', handleDisconnect);

      // Cleanup
      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
        window.ethereum.removeListener('disconnect', handleDisconnect);
      };
    }
  }, [dispatch, walletState.address]);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        throw new Error('MetaMask not installed');
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);

      // Request accounts
      const accounts = await provider.send('eth_requestAccounts', []);
      const network = await provider.getNetwork();
      
      dispatch(setWalletConnected({
        address: accounts[0],
        chainId: network.chainId
      }));

      // Get balance
      const balance = await provider.getBalance(accounts[0]);
      dispatch(updateBalance(ethers.utils.formatEther(balance)));

      return true;
    } catch (error: any) {
      dispatch(setError(error.message));
      return false;
    }
  };

  const disconnectWallet = async () => {
    dispatch(setWalletDisconnected());
    return true;
  };

  const refreshBalance = async () => {
    if (provider && walletState.address) {
      try {
        const balance = await provider.getBalance(walletState.address);
        dispatch(updateBalance(ethers.utils.formatEther(balance)));
        return true;
      } catch (error: any) {
        dispatch(setError(error.message));
        return false;
      }
    }
    return false;
  };

  const sendTransaction = async (
    to: string,
    value: string,
    data: string = '0x'
  ) => {
    if (!provider || !walletState.address) {
      dispatch(setError('Wallet not connected'));
      return null;
    }

    try {
      const signer = provider.getSigner();
      const tx = await signer.sendTransaction({
        to,
        value: ethers.utils.parseEther(value),
        data,
      });

      // Add to pending transactions
      dispatch(addPendingTransaction(tx.hash));
      
      // Add to transaction history
      dispatch(addTransactionToHistory({
        hash: tx.hash,
        status: 'pending',
        timestamp: Date.now()
      }));

      // Wait for transaction to complete
      const receipt = await tx.wait();
      
      // Update transaction status
      dispatch(updateTransactionStatus({
        hash: tx.hash,
        status: receipt.status === 1 ? 'success' : 'failed'
      }));
      
      // Remove from pending
      dispatch(removePendingTransaction(tx.hash));
      
      // Refresh balance
      await refreshBalance();
      
      return tx;
    } catch (error: any) {
      dispatch(setError(error.message));
      return null;
    }
  };

  const getNetworkName = () => {
    if (!walletState.chainId) return 'Unknown';
    
    switch (walletState.chainId) {
      case 1:
        return 'Ethereum Mainnet';
      case 5:
        return 'Goerli Testnet';
      case 11155111:
        return 'Sepolia Testnet';
      case 137:
        return 'Polygon Mainnet';
      case 80001:
        return 'Polygon Mumbai';
      case 1337:
        return 'Local Network';
      default:
        return `Chain ID: ${walletState.chainId}`;
    }
  };

  return {
    connectWallet,
    disconnectWallet,
    refreshBalance,
    sendTransaction,
    getNetworkName,
    provider,
    isConnected: walletState.isConnected,
    address: walletState.address,
    chainId: walletState.chainId,
    balance: walletState.balance,
    error: walletState.error,
    pendingTransactions: walletState.pendingTransactions,
    transactionHistory: walletState.transactionHistory,
  };
};

export default useWallet; 