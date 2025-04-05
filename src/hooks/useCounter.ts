import { useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { useDispatch } from 'react-redux';
import CounterABI from '../contracts/CounterABI.json';
import { getContractAddress } from '../contracts/contracts';
import {
  addPendingTransaction,
  removePendingTransaction,
  addTransactionToHistory,
  updateTransactionStatus,
  setError
} from '../redux/walletSlice';
import useWallet from './useWallet';

const useCounter = () => {
  const { provider, isConnected, chainId } = useWallet();
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // Get the contract address for the current network
  const contractAddress = getContractAddress(chainId);

  // Function to get the current count from the contract
  const getCount = useCallback(async () => {
    if (!provider || !isConnected) {
      return null;
    }

    try {
      setLoading(true);
      const contract = new ethers.Contract(
        contractAddress,
        CounterABI,
        provider
      );

      const currentCount = await contract.count();
      setCount(currentCount.toNumber());
      setLoading(false);
      return currentCount.toNumber();
    } catch (error: any) {
      console.error('Error getting count:', error);
      // Format error message for better user experience
      let errorMessage = 'Error reading contract data';
      
      if (error.code === 'CALL_EXCEPTION') {
        errorMessage = 'Contract read failed. Please check your connection or try again later.';
      } else if (error.message) {
        errorMessage = error.message.split('(')[0]; // Clean up error message
      }
      
      dispatch(setError(errorMessage));
      setLoading(false);
      return null;
    }
  }, [provider, isConnected, dispatch, contractAddress]);

  // Function to increment the counter
  const increment = useCallback(async () => {
    if (!provider || !isConnected) {
      dispatch(setError('Wallet not connected'));
      return false;
    }

    try {
      setLoading(true);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        CounterABI,
        signer
      );

      const tx = await contract.increment();
      
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
      
      // Small delay to ensure state updates properly
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Refresh count
      await getCount();
      
      setLoading(false);
      return true;
    } catch (error: any) {
      console.error('Error incrementing counter:', error);
      
      // Format error message for better user experience
      let errorMessage = 'Error incrementing counter';
      
      if (error.code === 'ACTION_REJECTED') {
        errorMessage = 'Transaction rejected by user.';
      } else if (error.code === 'INSUFFICIENT_FUNDS') {
        errorMessage = 'Insufficient funds for transaction.';
      } else if (error.code === 'CALL_EXCEPTION' && error.reason) {
        errorMessage = `Transaction reverted: ${error.reason}`;
      } else if (error.message) {
        // Clean up error message - remove blockchain specific details
        errorMessage = error.message.split('(')[0].trim();
      }
      
      dispatch(setError(errorMessage));
      setLoading(false);
      return false;
    }
  }, [provider, isConnected, getCount, dispatch, contractAddress]);

  // Function to decrement the counter
  const decrement = useCallback(async () => {
    if (!provider || !isConnected) {
      dispatch(setError('Wallet not connected'));
      return false;
    }

    try {
      setLoading(true);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        CounterABI,
        signer
      );

      const tx = await contract.decrement();
      
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
      
      // Small delay to ensure state updates properly
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Refresh count
      await getCount();
      
      setLoading(false);
      return true;
    } catch (error: any) {
      console.error('Error decrementing counter:', error);
      
      // Format error message for better user experience
      let errorMessage = 'Error decrementing counter';
      
      if (error.code === 'ACTION_REJECTED') {
        errorMessage = 'Transaction rejected by user.';
      } else if (error.code === 'INSUFFICIENT_FUNDS') {
        errorMessage = 'Insufficient funds for transaction.';
      } else if (error.code === 'CALL_EXCEPTION' && error.reason) {
        errorMessage = `Transaction reverted: ${error.reason}`;
      } else if (error.message && error.message.includes('cannot decrement below zero')) {
        errorMessage = 'Cannot decrement below zero.';
      } else if (error.message) {
        // Clean up error message - remove blockchain specific details
        errorMessage = error.message.split('(')[0].trim();
      }
      
      dispatch(setError(errorMessage));
      setLoading(false);
      return false;
    }
  }, [provider, isConnected, getCount, dispatch, contractAddress]);

  return {
    count,
    loading,
    getCount,
    increment,
    decrement
  };
};

export default useCounter; 