import React, { Component } from "react";

const withLoading = (WrappedComponent) => {
  return class WithLoading extends Component {
    state = {
      deg: 0,
      isLoading: false,
    };
    componentDidUpdate(prevState) {
      if (this.state.isLoading) {
        const interval = setInterval(
          (prevState) => this.setState({ deg: prevState.deg + 0.1 }),
          100,
        );
      }
    }

    setIsLoading = (value) => {
      this.setState({ isLoading: value });
    };

    render() {
      const { isLoading } = this.state;

      return (
        <WrappedComponent
          isLoading={isLoading}
          spin={this.state.deg}
          setIsLoading={this.setIsLoading}
        />
      );
    }
  };
};

export default withLoading;
