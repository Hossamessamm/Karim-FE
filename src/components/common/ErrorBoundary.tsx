import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4" dir="rtl">
          <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
            <div className="text-center">
              <svg 
                className="mx-auto h-16 w-16 text-red-500" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                />
              </svg>
              <h2 className="mt-4 text-2xl font-bold text-gray-900">حدث خطأ ما</h2>
              
              {this.state.error && (
                <div className="mt-2 text-right p-4 bg-red-50 rounded-lg overflow-auto max-h-32">
                  <p className="text-sm text-red-800 font-mono break-all">
                    {this.state.error.toString()}
                  </p>
                </div>
              )}
              
              <p className="mt-4 text-gray-600">
                إذا كنت تواجه مشاكل في الاتصال بالخادم، قد يكون ذلك بسبب إعدادات CORS.
                يرجى تجربة ما يلي:
              </p>
              
              <ul className="mt-4 text-right text-sm text-gray-600 space-y-2 bg-blue-50 p-4 rounded-lg">
                <li>• تحقق من اتصال الإنترنت</li>
                <li>• تأكد من تشغيل خادم API</li>
                <li>• جرب استخدام إضافة CORS للمتصفح (في بيئة التطوير)</li>
                <li>• اتصل بالمسؤول إذا استمرت المشكلة</li>
              </ul>
              
              <button
                onClick={() => window.location.reload()}
                className="mt-6 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                تحديث الصفحة
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 