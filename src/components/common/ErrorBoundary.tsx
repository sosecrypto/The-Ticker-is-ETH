import React from 'react';

interface Props {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback ?? (
                <div className="min-h-[40vh] flex flex-col items-center justify-center text-center px-6">
                    <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                        <span className="text-red-400 text-xl">!</span>
                    </div>
                    <h2 className="text-lg font-semibold text-white mb-2">Something went wrong</h2>
                    <p className="text-gray-400 text-sm mb-6 max-w-md">
                        An unexpected error occurred. Please try refreshing the page.
                    </p>
                    <button
                        onClick={() => this.setState({ hasError: false })}
                        className="px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors border border-white/10"
                    >
                        Try Again
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
