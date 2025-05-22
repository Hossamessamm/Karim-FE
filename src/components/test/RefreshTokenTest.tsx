import React, { useState } from 'react';
import { authService } from '../../services/api';

const RefreshTokenTest: React.FC = () => {
  const [testResult, setTestResult] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [testSteps, setTestSteps] = useState<string[]>([]);

  const addTestStep = (step: string) => {
    setTestSteps(prev => [...prev, `${new Date().toLocaleTimeString()}: ${step}`]);
  };

  const handleTestRefreshToken = async () => {
    setLoading(true);
    setTestSteps([]);
    addTestStep('Starting refresh token test...');

    try {
      addTestStep('Making request with invalid token...');
      const result = await authService.testRefreshToken();
      addTestStep(`Request completed with status: ${result.success ? 'Success' : 'Failed'}`);
      setTestResult(JSON.stringify(result, null, 2));
    } catch (error: any) {
      addTestStep('Error occurred during test');
      setTestResult(JSON.stringify(error, null, 2));
    } finally {
      setLoading(false);
      addTestStep('Test completed');
    }
  };

  const clearResults = () => {
    setTestResult('');
    setTestSteps([]);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Refresh Token Test</h2>
      
      <div className="space-y-4">
        <div className="flex gap-4">
          <button
            onClick={handleTestRefreshToken}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Test Refresh Token'}
          </button>

          <button
            onClick={clearResults}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Clear Results
          </button>
        </div>

        {testSteps.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Test Steps:</h3>
            <div className="bg-gray-100 p-4 rounded">
              {testSteps.map((step, index) => (
                <div key={index} className="mb-1">
                  {step}
                </div>
              ))}
            </div>
          </div>
        )}

        {testResult && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Test Result:</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
              {testResult}
            </pre>
          </div>
        )}

        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
          <h3 className="text-lg font-semibold mb-2">How to Test:</h3>
          <ol className="list-decimal list-inside space-y-2">
            <li>Make sure you're logged in</li>
            <li>Open browser DevTools (F12) and go to Network tab</li>
            <li>Click "Test Refresh Token" button</li>
            <li>Watch for the following sequence in Network tab:
              <ul className="list-disc list-inside ml-4 mt-1">
                <li>Initial request with 401 response</li>
                <li>Refresh token request</li>
                <li>Original request retry with new token</li>
              </ul>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RefreshTokenTest; 