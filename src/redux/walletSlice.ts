import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WalletState {
  address: string | null;
  isConnected: boolean;
  chainId: number | null;
  balance: string | null;
  error: string | null;
  pendingTransactions: string[];
  transactionHistory: {
    hash: string;
    status: 'success' | 'failed' | 'pending';
    timestamp: number;
  }[];
}

// Load persistent state from localStorage if available
const loadState = (): WalletState => {
  try {
    const serializedState = localStorage.getItem('walletState');
    if (serializedState === null) {
      return initialState;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return initialState;
  }
};

const initialState: WalletState = {
  address: null,
  isConnected: false,
  chainId: null,
  balance: null,
  error: null,
  pendingTransactions: [],
  transactionHistory: [],
};

// Get the state from localStorage if available
const persistedState = loadState();

export const walletSlice = createSlice({
  name: 'wallet',
  initialState: persistedState,
  reducers: {
    setWalletConnected: (state, action: PayloadAction<{ address: string; chainId: number }>) => {
      state.address = action.payload.address;
      state.chainId = action.payload.chainId;
      state.isConnected = true;
      state.error = null;
      
      // Save to localStorage
      localStorage.setItem('walletState', JSON.stringify(state));
    },
    setWalletDisconnected: (state) => {
      state.address = null;
      state.isConnected = false;
      state.chainId = null;
      state.balance = null;
      
      // Clear from localStorage
      localStorage.removeItem('walletState');
    },
    updateBalance: (state, action: PayloadAction<string>) => {
      state.balance = action.payload;
      
      // Update localStorage
      localStorage.setItem('walletState', JSON.stringify(state));
    },
    updateChainId: (state, action: PayloadAction<number>) => {
      state.chainId = action.payload;
      
      // Update localStorage
      localStorage.setItem('walletState', JSON.stringify(state));
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    addPendingTransaction: (state, action: PayloadAction<string>) => {
      state.pendingTransactions.push(action.payload);
    },
    removePendingTransaction: (state, action: PayloadAction<string>) => {
      state.pendingTransactions = state.pendingTransactions.filter(tx => tx !== action.payload);
    },
    addTransactionToHistory: (state, action: PayloadAction<{ hash: string; status: 'success' | 'failed' | 'pending'; timestamp: number }>) => {
      state.transactionHistory.push(action.payload);
      
      // Update localStorage
      localStorage.setItem('walletState', JSON.stringify(state));
    },
    updateTransactionStatus: (state, action: PayloadAction<{ hash: string; status: 'success' | 'failed' | 'pending' }>) => {
      const txIndex = state.transactionHistory.findIndex(tx => tx.hash === action.payload.hash);
      if (txIndex !== -1) {
        state.transactionHistory[txIndex].status = action.payload.status;
        
        // Update localStorage
        localStorage.setItem('walletState', JSON.stringify(state));
      }
    },
  },
});

export const {
  setWalletConnected,
  setWalletDisconnected,
  updateBalance,
  updateChainId,
  setError,
  addPendingTransaction,
  removePendingTransaction,
  addTransactionToHistory,
  updateTransactionStatus,
} = walletSlice.actions;

export default walletSlice.reducer; 