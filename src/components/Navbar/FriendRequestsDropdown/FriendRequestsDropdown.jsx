import React from "react";
import { acceptFriend } from "../../../redux/actions/acceptFriend.action";
import { declineFriend } from "../../../redux/actions/declineFriend.action";
import { updateUser } from "../../../redux/actions/login.action"
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function FriendsRequestsDropdown(props) {

    const dispatch = useDispatch();
    let user_id = useSelector(state => state.login.userDetails._id);

    const { friend_id, profile_pic, name } = props;

    const handleAccept = () => {
        dispatch(acceptFriend(user_id, friend_id))
            .then((res) => {
                if (res.data === "Success!") {
                    dispatch(updateUser(user_id));

                }
            });
    }

    const handleDecline = () => {
        dispatch(declineFriend(user_id, friend_id))
            .then((res) => {
                if (res.data === "Success!") {
                    dispatch(updateUser(user_id));
                }
            });
    }
    return (
        <div className="friend_request">
            <Link style={{ textDecoration: "none" }} to={friend_id}><img src={`${profile_pic}`} alt="Not loaded"></img></Link>
            <Link style={{ textDecoration: "none" }} to={friend_id}><p >{name}</p></Link>

            <button onClick={handleAccept}>Accept</button>
            <button onClick={handleDecline}>Decline</button>

        </div>
    )
}

export default FriendsRequestsDropdown;