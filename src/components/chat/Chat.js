import React, { Component } from "react";
import { connect } from "react-redux";

import { firestore } from "../../firebaseConfig";
import { wsUrl } from "../../utils/wsUrl";
import ChatInput from "./ChatInput";

class Chat extends Component {
  state = { counter: 0, messages: [], chatId: "" };
  ws = new WebSocket(wsUrl);
  componentWillReceiveProps(nextProps) {
    console.log("recive");

    this.ws.onopen = () => {
      console.log("connected");
    };
    if (this.state.chatId) {
      firestore
        .collection("users")
        .doc(nextProps.user.docId)
        .update({ chatId: this.state.chatId });
    }

    this.ws.onmessage = (evt) => {
      const message = JSON.parse(evt.data);

      if (message.message) {
        console.log(message.message);
        this.addMessage({ name: message.name, message: message.message });
      }
    };
    this.ws.onclose = () => {
      console.log("close");

      firestore
        .collection("users")
        .doc(nextProps.user.docId)
        .update({ chatId: null });

      this.setState({ ws: new WebSocket(wsUrl) });
    };
  }
  componentDidMount() {
    this.ws = new WebSocket(wsUrl);
    this.ws.onmessage = (evt) => {
      const message = JSON.parse(evt.data);
      console.log(message);
      this.setState({ chatId: message.uid });
    };
  }

  sendMessage = (e, uid) => {
    e.preventDefault();

    const message = {
      name: this.props.user.name,
      message: e.target.message.value,
      uid: uid,
    };
    console.log(message);
    this.ws.send(JSON.stringify(message));
    this.addMessage({ name: message.name, message: message.message });
  };
  addMessage = (message) =>
    this.setState({ messages: [message, ...this.state.messages] });
  render() {
    return (
      <div>
        {this.props.selectedChats
          ? this.props.selectedChats.map((index) => (
              <div>
                {this.state.messages.map((message) =>
                  message.name == this.props.chatUsers[index].name
                    ? message.message
                    : null,
                )}
                <ChatInput
                  sendMessage={this.sendMessage}
                  uid={this.props.chatUsers[index].chatId}
                />
              </div>
            ))
          : null}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
  selectedChats: state.selectedChats,
  chatUsers: state.chatUsers,
});
export default connect(mapStateToProps)(Chat);
