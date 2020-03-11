import React from "react";
import { ErrorTemplate } from "../../components/error/ErrorTemplate";
import { ErrorContent } from "../../components/error/ErrorContent";

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null, errorInfo: null };

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
    this.setState({ error, errorInfo });
    console.log(error);
    console.log(errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      const resetError = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
      };

      return (
        <ErrorTemplate>
          <ErrorContent resetError={resetError} />
        </ErrorTemplate>
      );
    }

    // Normally, just render children
    return this.props.children;
  }
}

export { ErrorBoundary };
