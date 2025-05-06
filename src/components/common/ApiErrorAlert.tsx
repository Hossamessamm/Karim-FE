import React from 'react';

interface ApiErrorAlertProps {
  message: string;
  onRetry?: () => void;
}

const ApiErrorAlert: React.FC<ApiErrorAlertProps> = ({ message, onRetry }) => {
  const isCorsError = message.toLowerCase().includes('cors') || 
                      message.toLowerCase().includes('network') || 
                      message.toLowerCase().includes('connection');

  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl mb-6">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-red-700">{message}</p>
          
          {isCorsError && (
            <div className="mt-2 text-xs text-gray-600 bg-gray-100 p-3 rounded">
              <p className="font-medium mb-1">This might be due to CORS (Cross-Origin Resource Sharing) issues:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>The API server may not allow requests from your browser</li>
                <li>Check if the API server is running and accessible</li>
                <li>Confirm with the API provider that your domain is allowed</li>
              </ul>
            </div>
          )}
          
          {onRetry && (
            <div className="mt-2">
              <button
                onClick={onRetry}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApiErrorAlert; 