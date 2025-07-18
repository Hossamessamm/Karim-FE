import React, { useState } from 'react';
import { authService } from '../../services/api';
import { useCourseApi } from '../../hooks/useCourseApi';
import { getTenantId, getTenantHeaders } from '../../config/tenant';

export const TenantHeaderTest: React.FC = () => {
  const [testResults, setTestResults] = useState<string[]>([]);
  const { getCourses } = useCourseApi();

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testTenantConfig = () => {
    const tenantId = getTenantId();
    const headers = getTenantHeaders();
    addResult(`Tenant ID: ${tenantId}`);
    addResult(`Tenant Headers: ${JSON.stringify(headers)}`);
  };

  const testAuthServiceCall = async () => {
    try {
      addResult('Testing auth service call...');
      // This will fail but we can check the network tab for headers
      await authService.login('test@example.com', 'test');
    } catch (error) {
      addResult('Auth call completed (check network tab for X-Tenant-ID header)');
    }
  };

  const testCourseServiceCall = async () => {
    try {
      addResult('Testing course service call...');
      await getCourses('Secondary1', 1, 5);
    } catch (error) {
      addResult('Course call completed (check network tab for X-Tenant-ID header)');
    }
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Tenant Header Test</h2>
      
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={testTenantConfig}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Test Tenant Config
          </button>
          
          <button
            onClick={testAuthServiceCall}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Test Auth Service
          </button>
          
          <button
            onClick={testCourseServiceCall}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Test Course Service
          </button>
          
          <button
            onClick={clearResults}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Clear Results
          </button>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Test Results:</h3>
          <div className="bg-gray-100 p-4 rounded-lg max-h-64 overflow-y-auto">
            {testResults.length === 0 ? (
              <p className="text-gray-500">No test results yet. Click a test button above.</p>
            ) : (
              <div className="space-y-1">
                {testResults.map((result, index) => (
                  <div key={index} className="text-sm font-mono">
                    {result}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold text-yellow-800">Instructions:</h4>
          <ol className="list-decimal list-inside text-sm text-yellow-700 mt-2 space-y-1">
            <li>Open browser Developer Tools (F12)</li>
            <li>Go to Network tab</li>
            <li>Click the test buttons above</li>
            <li>Check the request headers for "X-Tenant-ID: tenant3"</li>
          </ol>
        </div>
      </div>
    </div>
  );
}; 