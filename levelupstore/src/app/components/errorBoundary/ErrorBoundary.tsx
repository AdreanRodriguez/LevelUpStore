"use client";

import React from "react";

// Typ för ErrorBoundary-props
// Den förväntar sig att omsluta barnkomponenter (children)
interface ErrorBoundaryProps {
  children: React.ReactNode;
}

// Typ för ErrorBoundary-state
// Vi lagrar om det finns ett fel och själva felobjektet
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

// ErrorBoundary är en klasskomponent som fångar fel i sina barnkomponenter
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    // Initialt finns inget fel
    this.state = {
      hasError: false,
      error: null,
    };
  }

  /**
   * Denna metod kallas automatiskt när ett fel uppstår i en barnkomponent.
   * Här kan vi uppdatera state för att visa en fallback-UI.
   */
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error, // Spara felet i state
    };
  }

  /**
   * Denna metod används för att logga fel.
   * Den körs automatiskt när ett fel uppstår.
   */
  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    console.error("ErrorBoundary caught an error:", error, info);
  }

  /**
   * Återställ ErrorBoundary till sitt ursprungliga läge.
   * Kan kallas av en knapp för att försöka igen.
   */
  resetErrorBoundary = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  /**
   * render-metoden avgör vad som ska visas.
   * Om det finns ett fel, visa ett fallback-UI.
   * Annars rendera de barnkomponenter som ErrorBoundary omsluter.
   */
  render() {
    if (this.state.hasError) {
      // Fallback-UI när ett fel inträffar
      return (
        <div className="p-5 text-center h-lvh">
          <h1 className="text-3xl font-bold text-red-500 mb-4">Oops! Something went wrong.</h1>
          <p className="mb-4">{this.state.error?.message}</p>
          <button
            className="px-4 py-2 bg-gray-600 text-white hover:bg-gray-500 rounded"
            onClick={this.resetErrorBoundary}
          >
            Try Again
          </button>
        </div>
      );
    }

    // Om inget fel, visa barnkomponenterna som vanligt
    return this.props.children;
  }
}
