import React from "react";
import FriendDiv from "./FriendDiv/FriendDiv";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner"

import { useSelector, useDispatch } from "react-redux";

function FriendsBar(props) {
    console.log("PROPS HERE" + props.id);
    const friendsList = useSelector(state => state.getFriendsList.friendsList);
    const dispatch = useDispatch();
    const { name, user_id, profile_pic } = friendsList;

    return (
        <div className="friends-bar">
            <h3>Friends</h3>
            {name !== undefined ? name.map((el, i) => {
                return (<FriendDiv key={i} id={user_id[i]} name={el} img={profile_pic[i]} />)
            }) : <LoadingSpinner/>}
        </div>
    )
}

export default FriendsBar;