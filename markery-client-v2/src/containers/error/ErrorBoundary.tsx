import React from 'react';
import { connect } from 'react-redux';
import { resetError, ErrorState } from '../../modules/actions/error';
import { ErrorTemplate } from '../../components/error/ErrorTemplate';
import { ErrorContent } from '../../components/error/ErrorContent';
import { RootState } from '../../modules';

interface ErrorBoundaryProps {
  error: ErrorState;
  resetError: () => void;
}

class _ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  state = { hasError: false, error: null, errorInfo: null };

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
    this.setState({ error, errorInfo });
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

    if (this.props.error.hasError) {
      return (
        <ErrorTemplate>
          <ErrorContent resetError={this.props.resetError} />
        </ErrorTemplate>
      );
    }

    // Normally, just render children
    return this.props.children;
  }
}

const mapStateToProps = (state: RootState) => ({ error: state.error });

export const ErrorBoundary = connect(mapStateToProps, { resetError })(
  _ErrorBoundary
);
