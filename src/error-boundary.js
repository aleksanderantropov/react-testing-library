import React from 'react';
import { report } from './api';

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
    report(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <div role='alert'>Something went wrong</div>;
    }

    return this.props.children;
  }
}
