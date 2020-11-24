import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import FriendsList from "../components/friends/FriendsList";
import { firestore } from "../firebaseConfig";

const Friends = ({ userFriends }) => {
  const [friends, setFriends] = useState([]);
  const [pagination, setPagination] = useState(1);

  useEffect(() => {
    if (userFriends) {
      if (userFriends.length > 0) {
        console.log(userFriends);
        firestore
          .collection("users")
          .where("uid", "in", userFriends)

          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) =>
              setFriends([...friends, doc.data()]),
            );
          });
      }
    }
  }, [userFriends]);
  return (
    <>
      {friends ? (
        <>
          <FriendsList friends={friends} />
        </>
      ) : null}
    </>
  );
};
const mapStateToProps = (state) => ({
  userFriends: state.user ? state.user.follows : null,
});
export default connect(mapStateToProps)(Friends);
