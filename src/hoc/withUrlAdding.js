import React, { Component } from "react";
import { useDispatch } from "react-redux";
import { addImageUrlAction } from "../actions";
import { storage } from "../firebaseConfig";
const withUrlAdding = (WrappedComponent) => {
  return class withUrlAdding extends Component {
    state = {
      imagesNames: [],
    };

    addUrl = (name) => {
      if (!this.state.imagesNames.includes(name)) {
        const pathRef = storage.ref("/photos/" + name);

        pathRef.getDownloadURL().then((url) => {
          const tempImage = { name: name, url: url };
          this.setState({
            imagesNames: [...this.state.imagesNames, name],
          });
          useDispatch(addImageUrlAction(tempImage));
        });
      }
    };
    render() {
      return <WrappedComponent addUrl={this.addUrl} />;
    }
  };
};
export default withUrlAdding;
