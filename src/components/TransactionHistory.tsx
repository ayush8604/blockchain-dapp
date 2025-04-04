import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const TransactionHistory: React.FC = () => {
  const { transactionHistory, pendingTransactions } = useSelector(
    (state: RootState) => state.wallet
  );

  if (transactionHistory.length === 0 && pendingTransactions.length === 0) {
    return null;
  }

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className="card w-full bg-[#14352f] shadow-xl mt-4 border border-gray-800">
      <div className="card-body">
        <h2 className="card-title text-white">Transaction History</h2>
        
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-gray-400">Transaction Hash</th>
                <th className="text-gray-400">Status</th>
                <th className="text-gray-400">Time</th>
              </tr>
            </thead>
            <tbody>
              {pendingTransactions.map((tx) => (
                <tr key={tx} className="bg-[#112724c7] hover:bg-[#1a3934] border-b border-gray-800">
                  <td className="font-mono text-xs">
                    {tx.substring(0, 6)}...{tx.substring(tx.length - 4)}
                  </td>
                  <td>
                    <div className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-[#5f9ea0] bg-opacity-20 text-[#5f9ea0]">
                      <span className="loading loading-spinner loading-xs mr-1"></span>
                      Pending
                    </div>
                  </td>
                  <td>Now</td>
                </tr>
              ))}
              
              {transactionHistory
                .sort((a, b) => b.timestamp - a.timestamp)
                .map((tx) => (
                  <tr key={tx.hash} className="hover:bg-[#1a3934] border-b border-gray-800">
                    <td className="font-mono text-xs">
                      <a 
                        href={`https://etherscan.io/tx/${tx.hash}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-[#5f9ea0] transition-colors"
                      >
                        {tx.hash.substring(0, 6)}...{tx.hash.substring(tx.hash.length - 4)}
                      </a>
                    </td>
                    <td>
                      {tx.status === 'success' ? (
                        <div className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-[#5f9ea0] bg-opacity-20 text-[#5f9ea0]">Success</div>
                      ) : tx.status === 'failed' ? (
                        <div className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-red-500 bg-opacity-20 text-red-300">Failed</div>
                      ) : (
                        <div className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-[#5f9ea0] bg-opacity-20 text-[#5f9ea0]">
                          <span className="loading loading-spinner loading-xs mr-1"></span>
                          Pending
                        </div>
                      )}
                    </td>
                    <td>{formatTimestamp(tx.timestamp)}</td>
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