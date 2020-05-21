import React, { useEffect } from "react";

import ProfileBar from "../components/ProfileBar/ProfileBar";
import NewPost from "../components/NewPost/NewPost";
import PostsContainer from "../components/PostsContainer/PostsContainer"
import FriendsBar from "../components/FriendsBar/FriendsBar"
import { getFriendList } from "../redux/actions/getFriendList.action";
import { useSelector, useDispatch } from "react-redux";
import { getFriendDetails } from "../redux/actions/getFriendDetails.action";

function FriendPage({ match: { params: { friend_id } } }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFriendDetails(friend_id))
        dispatch(getFriendList(friend_id, ''))
    }, [dispatch,friend_id])

    const friend_details = useSelector(state => state.getFriendDetails)
    const userDetails = useSelector(state => state.login.userDetails);

    const { loading, success } = friend_details;

    if (!loading && success === false) {
        return (
            <div><img src={require("../assets/images/loading.gif")} alt="not loaded" /></div>
        )
    }
    else if (success === true && loading === false) {
        const { name, num_likes, num_posts, profile_pic, id } = friend_details.friendDetails;
        const { first_name, last_name } = userDetails;
        return (
            <div className="home">
                <div className="top-container">
                    <ProfileBar
                        friend_id={friend_id}
                        name={name}
                        likes={num_likes}
                        posts={num_posts}
                        profile_pic={profile_pic} />
                    <NewPost friend_id={friend_id} posted_to={friend_details.friendDetails.name} added_by={first_name + " " + last_name} />
                </div>
                <br />
                <div className="bottom-container">
                    <FriendsBar id={id} />
                    <PostsContainer friend_id={friend_id} user_to={name}></PostsContainer>
                </div>
            </div>
        )
    }



}
export default FriendPage;