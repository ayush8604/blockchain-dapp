import React, { useEffect, useState } from 'react';

interface SuccessNotificationProps {
  show: boolean;
  onClose: () => void;
}

const SuccessNotification: React.FC<SuccessNotificationProps> = ({ show, onClose }) => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onClose, 300); // Wait for animation to finish
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);
  
  if (!show && !visible) return null;
  
  return (
    <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 transition-opacity duration-300 z-50 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="bg-green-800 border border-green-600 text-green-100 shadow-lg rounded-lg px-4 py-3 max-w-md">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="font-medium">Wallet Connected Successfully!</p>
            <p className="text-sm mt-1">You can now interact with the blockchain.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessNotification; 