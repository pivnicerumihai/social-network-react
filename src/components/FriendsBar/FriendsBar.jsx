import React, { useEffect } from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import FriendDiv from "./FriendDiv/FriendDiv";
import { getAllFriends } from "../../redux/actions/getAllFriends.action";

import { useSelector, useDispatch } from "react-redux";

function FriendsBar(props) {
    const { id } = props;
    const all_friends = useSelector(state => state.getAllFriends.all_friends);
    const loading = useSelector(state => state.getFriendsList.loading);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllFriends(id))
    }, [])

    const { name, user_id, profile_pic } = all_friends;

    return (
        <div className="friends-bar">
            <h3>Friends</h3>
            {name !== undefined && loading === false ? name.map((el, i) => {
                return (<FriendDiv key={i} id={user_id[i]} name={el} img={profile_pic[i]} />)
            }) : loading === false && name === undefined ? <LoadingSpinner/> : 
            <p style={{backgroundColor:"white",width:"320px", padding:"15px",textAlign:"center"}}>
                You have no friends! <br/> You can add friends by searching for people in the search bar and then sending a friend request!
            </p>}
        </div>
    )
}

export default FriendsBar;