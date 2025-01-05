"use client";

import React, { useState } from "react";

// Typ för ErrorBoundary-props
interface ErrorBoundaryProps {
  children: React.ReactNode;
}

// Typ för ErrorCatcher-props
interface ErrorCatcherProps {
  children: React.ReactNode;
  onError: (error: Error) => void;
}

// Funktionell komponent för ErrorBoundary
const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [error, setError] = useState<Error | null>(null);

  const resetErrorBoundary = () => {
    setError(null);
  };

  if (error) {
    return (
      <div className="p-5 text-center h-lvh font-righteous max-w-mainSize m-auto">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Oops! Something went wrong.</h1>
        <p className="mb-4">{error.message}</p>
        <button
          className="px-4 py-2 bg-gray-600 text-white hover:bg-gray-500 rounded"
          onClick={resetErrorBoundary}
        >
          Try Again
        </button>
      </div>
    );
  }

  return <ErrorCatcher onError={setError}>{children}</ErrorCatcher>;
};

// Klasskomponent som använder `componentDidCatch`
// Den faktiska implementationen av Reacts componentDidCatch, vilket kräver en klass.
// Den skickar felet uppåt till den funktionella ErrorBoundary via onError.
class ErrorCatcher extends React.Component<ErrorCatcherProps> {
  componentDidCatch(error: Error) {
    this.props.onError(error);
  }

  render() {
    return this.props.children;
  }
}

export default ErrorBoundary;
