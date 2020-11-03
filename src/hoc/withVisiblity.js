import React, { Component } from "react";

const withVisiblity = (WrappedComponent) => {
  return class WithVisiblity extends Component {
    state = {
      isVisible: false,
    };

    setVisibility = (value) => {
      this.setState({ isVisible: value });
    };

    render() {
      const { isVisible } = this.state;

      return (
        <WrappedComponent
          isVisible={isVisible}
          setVisibility={this.setVisibility}
        />
      );
    }
  };
};

export default withVisiblity;
