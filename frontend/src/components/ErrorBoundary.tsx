import React, { Component, PropsWithChildren } from "react";

interface Props { }

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<
  PropsWithChildren<Props>,
  State
> {
  state = {
    hasError: false,
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.log(error, info);
  }

  render() {
    const { children } = this.props;

    if (this.state.hasError) {
      return <h1>{"Oops! Something went wrong."}</h1>;
    }
    return children;
  }
}
