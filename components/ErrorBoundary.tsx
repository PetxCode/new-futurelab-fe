import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error Boundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="min-h-[400px] flex items-center justify-center p-8 bg-slate-800/20 backdrop-blur-xl border border-slate-700/50 rounded-[3rem] text-center animate-in zoom-in-95 duration-500">
          <div className="space-y-6 max-w-md">
            <div className="w-20 h-20 bg-rose-500/10 rounded-full flex items-center justify-center text-4xl mx-auto border border-rose-500/20">
              ⚠️
            </div>
            <div>
              <h2 className="text-2xl font-black text-white mb-2">System Interruption</h2>
              <p className="text-slate-400 font-medium">Something went wrong while rendering this component. Our engineers have been notified.</p>
            </div>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="px-8 py-3 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/20 active:scale-95"
            >
              Attempt Recovery
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
