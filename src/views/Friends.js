import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import FriendsList from "../components/friends/FriendsList";
import { firestore } from "../firebaseConfig";

const Friends = ({ userFriends }) => {
  const [friends, setFriends] = useState([]);
  const [pagination, setPagination] = useState(1);

  return (
    <>
      {friends ? (
        <>
          <FriendsList friends={userFriends} />
        </>
      ) : null}
    </>
  );
};
const mapStateToProps = (state) => ({
  userFriends: state.friends,
});
export default connect(mapStateToProps)(Friends);
