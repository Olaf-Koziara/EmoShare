import React, { Component } from "react";
import { connect } from "react-redux";
import { selectChatAction } from "../../actions";

import { firestore } from "../../firebaseConfig";
import { StyledChatsWrapper } from "../../styledComponents";
import { wsUrl } from "../../utils/wsUrl";
import ChatInput from "./ChatInput";

class Chat extends Component {
  state = { counter: 0, messages: [], chatId: null };

  ws = "";

  componentDidUpdate(prevState) {
    if (
      this.state.chatId !== prevState.chatId &&
      this.props.user.docId &&
      this.state.chatId
    ) {
      firestore
        .collection("users")
        .doc(this.props.user.docId)
        .update({ chatId: this.state.chatId });
    }
  }
  componentWillReceiveProps(nextProps) {
    this.ws.onopen = () => {
      console.log("connected");
    };
    if (this.state.chatId) {
      firestore
        .collection("users")
        .doc(nextProps.user.docId)
        .update({ chatId: this.state.chatId });

      this.ws.onmessage = (evt) => {
        const message = JSON.parse(evt.data);

        if (message.message) {
          const chatIndex = this.props.chatUsers.findIndex(
            (user) => user.chatId === message.uid,
          );
          if (!this.props.selectedChats.includes(chatIndex)) {
            this.props.selectChat(chatIndex);
          }
          this.addMessage({ name: message.name, message: message.message });
        }
      };
    }
    this.ws.onclose = () => {
      console.log("close");

      firestore
        .collection("users")
        .doc(nextProps.user.docId)
        .update({ chatId: null });
      console.log("up");
      this.setState({ ws: new WebSocket(wsUrl) });
    };
  }
  componentDidMount() {
    this.ws = new WebSocket(wsUrl);
    console.log("mount");
    this.ws.onmessage = (evt) => {
      console.log(evt.data);
      const message = JSON.parse(evt.data);
      console.log(message);
      this.setState({ chatId: message.uid });
    };
  }
  componentWillUnmount() {
    if (this.props.user.docId) {
      firestore
        .collection("users")
        .doc(this.props.user.docId)
        .update({ chatId: null });
      this.setState({ chatId: null });
    }
  }
  sendMessage = (e, chatId, uid) => {
    e.preventDefault();

    const message = {
      name: this.props.user.name,
      message: e.target.message.value,
      uid: chatId,
    };
    console.log(message);
    this.ws.send(JSON.stringify(message));
    this.addMessage({
      name: message.name,
      message: message.message,
      to: chatId,
    });
    e.target.reset();
  };
  addMessage = (message) =>
    this.setState({ messages: [message, ...this.state.messages] });
  render() {
    return (
      <StyledChatsWrapper>
        {this.props.selectedChats
          ? this.props.selectedChats.map((index) =>
              this.props.chatUsers[index] ? (
                <ChatInput
                  chatUser={this.props.chatUsers[index]}
                  messages={this.state.messages.filter(
                    (message) =>
                      message.name === this.props.chatUsers[index].name ||
                      message.to === this.props.chatUsers[index].chatId,
                  )}
                  sendMessage={this.sendMessage}
                  chatIndex={index}
                />
              ) : null,
            )
          : null}
      </StyledChatsWrapper>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
  selectedChats: state.selectedChats,
  chatUsers: state.chatUsers,
});
const mapDispatchToProps = (dispatch) => ({
  selectChat: (index) => dispatch(selectChatAction(index)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
