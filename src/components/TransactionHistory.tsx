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
    <div className="card w-full bg-base-200 shadow-xl mt-4">
      <div className="card-body">
        <h2 className="card-title">Transaction History</h2>
        
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Transaction Hash</th>
                <th>Status</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {pendingTransactions.map((tx) => (
                <tr key={tx} className="bg-base-300">
                  <td className="font-mono text-xs">
                    {tx.substring(0, 6)}...{tx.substring(tx.length - 4)}
                  </td>
                  <td>
                    <div className="badge badge-warning gap-2">
                      <span className="loading loading-spinner loading-xs"></span>
                      Pending
                    </div>
                  </td>
                  <td>Now</td>
                </tr>
              ))}
              
              {transactionHistory
                .sort((a, b) => b.timestamp - a.timestamp)
                .map((tx) => (
                  <tr key={tx.hash}>
                    <td className="font-mono text-xs">
                      <a 
                        href={`https://etherscan.io/tx/${tx.hash}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="link"
                      >
                        {tx.hash.substring(0, 6)}...{tx.hash.substring(tx.hash.length - 4)}
                      </a>
                    </td>
                    <td>
                      {tx.status === 'success' ? (
                        <div className="badge badge-success gap-2">Success</div>
                      ) : tx.status === 'failed' ? (
                        <div className="badge badge-error gap-2">Failed</div>
                      ) : (
                        <div className="badge badge-warning gap-2">
                          <span className="loading loading-spinner loading-xs"></span>
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