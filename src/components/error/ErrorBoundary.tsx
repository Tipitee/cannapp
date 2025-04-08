
import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  FallbackComponent?: React.ComponentType<{ error: Error; resetErrorBoundary: () => void }>;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("Uncaught error:", error, errorInfo);
  }

  resetErrorBoundary = (): void => {
    this.props.onReset?.();
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.FallbackComponent) {
        return (
          <this.props.FallbackComponent 
            error={this.state.error} 
            resetErrorBoundary={this.resetErrorBoundary} 
          />
        );
      }
      
      // Default fallback UI
      return (
        <div className="p-4 rounded border border-red-400 bg-red-50 text-red-800">
          <h2 className="text-lg font-medium mb-2">Something went wrong</h2>
          <p className="mb-4 text-sm">{this.state.error.message}</p>
          <button 
            onClick={this.resetErrorBoundary}
            className="px-3 py-1 bg-red-100 border border-red-400 rounded hover:bg-red-200"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
