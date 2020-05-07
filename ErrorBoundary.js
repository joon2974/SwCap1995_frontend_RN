import React, { FallbackComponent } from 'react';

export default class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    console.log(error);

    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-undef
    logErrorToService(error, info.componentStack);
  }

  render() {
    return this.state.hasError ? <FallbackComponent /> : this.props.children;
  }
}
