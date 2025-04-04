# Blockchain Frontend Integration dApp

This is a simple decentralized application (dApp) that includes wallet integration, wallet state management, and interaction with smart contracts using the connected wallet.

## Features

- Connect/disconnect MetaMask wallet
- Display connected wallet address and network
- Handle wallet/network change events
- Persist wallet state on page refresh
- Interact with a smart contract (Counter)
- View transaction history
- Error handling for wallet operations

## Tech Stack

- **Frontend**: React.js with TypeScript
- **Blockchain Interaction**: Ethers.js (v5)
- **Wallet Integration**: MetaMask
- **State Management**: Redux with Redux Toolkit
- **Styling**: TailwindCSS with DaisyUI
- **Smart Contract**: Ethereum-compatible (working with any EVM chain)

## Prerequisites

- Node.js (v16+)
- npm or yarn
- MetaMask extension installed in your browser

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd blockchain-dapp
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Smart Contract Integration

The application is set up to interact with a simple Counter smart contract. For testing purposes, you can use the following options:

### Option 1: Use a Local Blockchain

1. Install and run Hardhat or Ganache
2. Deploy a Counter contract (see example below)
3. Update the contract address in `src/contracts/contracts.ts`

### Option 2: Use a Testnet

1. Get some testnet ETH (from a faucet)
2. Deploy the contract to a testnet like Goerli or Sepolia
3. Update the contract address in `src/contracts/contracts.ts`

## Example Counter Contract

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Counter {
    uint256 public count = 0;
    
    function increment() public {
        count += 1;
    }
    
    function decrement() public {
        require(count > 0, "Counter: cannot decrement below zero");
        count -= 1;
    }
}
```

## How to Use the Application

1. Connect your MetaMask wallet by clicking the "Connect Wallet" button
2. Ensure you're connected to the correct network where your contract is deployed
3. View the current counter value
4. Click "Increment" or "Decrement" to modify the counter
5. Confirm the transaction in MetaMask
6. View your transaction history at the bottom of the page

## Project Structure

```
blockchain-dapp/
├── public/                  # Static files
├── src/
│   ├── components/          # React components
│   │   ├── Counter.tsx      # Counter contract interaction
│   │   ├── ErrorDisplay.tsx # Error message display
│   │   ├── Navbar.tsx       # Application navbar with wallet info
│   │   └── TransactionHistory.tsx  # Transaction list
│   ├── contracts/           # Contract ABIs and addresses
│   │   ├── CounterABI.json  # ABI for the Counter contract
│   │   └── contracts.ts     # Contract addresses and network configs
│   ├── hooks/               # Custom React hooks
│   │   ├── useCounter.ts    # Hook for Counter contract interaction
│   │   └── useWallet.ts     # Hook for wallet interactions
│   ├── redux/               # Redux state management
│   │   ├── store.ts         # Redux store configuration
│   │   └── walletSlice.ts   # Wallet state management
│   ├── App.tsx              # Main application component
│   ├── index.tsx            # Application entry point
│   └── ...
└── ...
```

## License

MIT
