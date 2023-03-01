import React from 'react';
import { reportError } from './api';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    reportError(error, info);
  }

  tryAgain = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div role='alert'>
          Something went wrong
          <button onClick={this.tryAgain}>Try Again</button>
        </div>
      );
    }

    return this.props.children;
  }
}
