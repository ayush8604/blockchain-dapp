// Define the network IDs as constants to use as type-safe keys
export const NETWORK_IDS = {
  ETHEREUM_MAINNET: 1,
  ETHEREUM_GOERLI: 5,
  ETHEREUM_SEPOLIA: 11155111,
  POLYGON_MAINNET: 137,
  POLYGON_MUMBAI: 80001,
  BSC_MAINNET: 56,
  BSC_TESTNET: 97,
  AVALANCHE: 43114,
  LOCAL: 1337,
} as const;

// Type for network IDs
type NetworkId = typeof NETWORK_IDS[keyof typeof NETWORK_IDS];

// Check if a number is a valid NetworkId
export const isValidNetworkId = (chainId: number | null): chainId is NetworkId => {
  if (chainId === null) return false;
  return Object.values(NETWORK_IDS).includes(chainId as NetworkId);
};

// List of testnets for checking testnet status
export const TESTNET_IDS: NetworkId[] = [
  NETWORK_IDS.ETHEREUM_GOERLI,
  NETWORK_IDS.ETHEREUM_SEPOLIA,
  NETWORK_IDS.POLYGON_MUMBAI,
  NETWORK_IDS.BSC_TESTNET,
  NETWORK_IDS.LOCAL
];

// Network-specific contract addresses
export const COUNTER_CONTRACT_ADDRESSES: Record<NetworkId, string> = {
  [NETWORK_IDS.ETHEREUM_MAINNET]: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0", // Ethereum Mainnet
  [NETWORK_IDS.ETHEREUM_GOERLI]: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0", // Goerli Testnet
  [NETWORK_IDS.ETHEREUM_SEPOLIA]: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0", // Sepolia Testnet
  [NETWORK_IDS.POLYGON_MAINNET]: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0", // Polygon Mainnet
  [NETWORK_IDS.POLYGON_MUMBAI]: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0", // Polygon Mumbai
  [NETWORK_IDS.BSC_MAINNET]: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0", // Binance Smart Chain
  [NETWORK_IDS.BSC_TESTNET]: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0", // BSC Testnet
  [NETWORK_IDS.AVALANCHE]: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0", // Avalanche C-Chain
  [NETWORK_IDS.LOCAL]: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0", // Local development
};

// Use this to select the right address based on the current network
export const getContractAddress = (chainId: number | null): string => {
  if (!chainId) return COUNTER_CONTRACT_ADDRESSES[NETWORK_IDS.LOCAL]; // Default to local
  
  // Check if the chainId exists in our addresses
  if (isValidNetworkId(chainId)) {
    return COUNTER_CONTRACT_ADDRESSES[chainId];
  }
  
  // Default to local if the network is not supported
  return COUNTER_CONTRACT_ADDRESSES[NETWORK_IDS.LOCAL];
};

// Common test networks
export const NETWORKS = NETWORK_IDS;

// Network metadata
export const NETWORK_METADATA: Record<NetworkId, { name: string; currencySymbol: string; blockExplorer: string }> = {
  [NETWORK_IDS.ETHEREUM_MAINNET]: {
    name: "Ethereum Mainnet",
    currencySymbol: "ETH",
    blockExplorer: "https://etherscan.io",
  },
  [NETWORK_IDS.ETHEREUM_GOERLI]: {
    name: "Goerli Testnet",
    currencySymbol: "ETH",
    blockExplorer: "https://goerli.etherscan.io",
  },
  [NETWORK_IDS.ETHEREUM_SEPOLIA]: {
    name: "Sepolia Testnet",
    currencySymbol: "ETH",
    blockExplorer: "https://sepolia.etherscan.io",
  },
  [NETWORK_IDS.POLYGON_MAINNET]: {
    name: "Polygon Mainnet",
    currencySymbol: "MATIC",
    blockExplorer: "https://polygonscan.com",
  },
  [NETWORK_IDS.POLYGON_MUMBAI]: {
    name: "Polygon Mumbai",
    currencySymbol: "MATIC",
    blockExplorer: "https://mumbai.polygonscan.com",
  },
  [NETWORK_IDS.BSC_MAINNET]: {
    name: "BSC Mainnet",
    currencySymbol: "BNB",
    blockExplorer: "https://bscscan.com",
  },
  [NETWORK_IDS.BSC_TESTNET]: {
    name: "BSC Testnet",
    currencySymbol: "BNB",
    blockExplorer: "https://testnet.bscscan.com",
  },
  [NETWORK_IDS.AVALANCHE]: {
    name: "Avalanche C-Chain",
    currencySymbol: "AVAX",
    blockExplorer: "https://snowtrace.io",
  },
  [NETWORK_IDS.LOCAL]: {
    name: "Local Network",
    currencySymbol: "ETH",
    blockExplorer: "",
  },
}; 