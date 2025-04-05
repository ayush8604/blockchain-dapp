import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const TransactionHistory: React.FC = () => {
  const { transactionHistory, pendingTransactions, isConnected } = useSelector(
    (state: RootState) => state.wallet
  );

  // Don't render if wallet is not connected or if there's no transaction history
  if (!isConnected || (transactionHistory.length === 0 && pendingTransactions.length === 0)) {
    return null;
  }

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  // Create a sorted copy of the transaction history
  const sortedTransactions = [...transactionHistory].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="card w-full max-w-4xl mx-auto bg-[#14352f] shadow-xl mt-4 border border-gray-800">
      <div className="card-body p-5">
        <div className="w-full text-center mb-4">
          <h2 className="text-2xl font-bold text-white">Transaction History</h2>
        </div>
        
        <div className="overflow-x-auto w-full">
          <table className="table w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-3 px-4 text-center text-sm font-semibold text-gray-300 w-1/2">
                  Transaction Hash
                </th>
                <th className="py-3 px-4 text-center text-sm font-semibold text-gray-300 w-1/6">
                  Status
                </th>
                <th className="py-3 px-4 text-center text-sm font-semibold text-gray-300 w-1/3">
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700 bg-[#112724c7]">
              {pendingTransactions.map((tx) => (
                <tr key={tx} className="hover:bg-[#1a3934]">
                  <td className="py-4 px-4 text-center text-sm">
                    <span className="font-mono text-white break-all">
                      {tx}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-500 bg-opacity-20 text-yellow-300">
                      Pending
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center text-sm text-gray-400">
                    Now
                  </td>
                </tr>
              ))}
              
              {sortedTransactions.map((tx) => (
                <tr key={tx.hash} className="hover:bg-[#1a3934]">
                  <td className="py-4 px-4 text-center text-sm">
                    <a 
                      href={`https://etherscan.io/tx/${tx.hash}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-mono text-blue-400 hover:text-[#5f9ea0] transition-colors break-all"
                    >
                      {tx.hash}
                    </a>
                  </td>
                  <td className="py-4 px-4 text-center">
                    {tx.status === 'success' ? (
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500 bg-opacity-20 text-green-400">
                        Success
                      </div>
                    ) : tx.status === 'failed' ? (
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-500 bg-opacity-20 text-red-300">
                        Failed
                      </div>
                    ) : (
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-500 bg-opacity-20 text-yellow-300">
                        Pending
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-4 text-center text-sm text-gray-400">
                    {formatTimestamp(tx.timestamp)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory; 