import React, { useEffect } from "react";

import ProfileBar from "../components/ProfileBar/ProfileBar";
import NewPost from "../components/NewPost/NewPost";
import PostsContainer from "../components/PostsContainer/PostsContainer"
import FriendsBar from "../components/FriendsBar/FriendsBar"
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner"
import { getAllFriends } from "../redux/actions/getAllFriends.action";
import { useSelector, useDispatch } from "react-redux";
import { getFriendDetails } from "../redux/actions/getFriendDetails.action";
import { Redirect } from "react-router-dom";

function FriendPage({ match: { params: { friend_id } } }) {



    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFriendDetails(friend_id))
        dispatch(getAllFriends(friend_id))
    }, [dispatch, friend_id])

    const friend_details = useSelector(state => state.getFriendDetails)
    const userDetails = useSelector(state => state.login.userDetails);


// Redirect to home page, if user clicks on his profile
    if (friend_id === userDetails._id) {
        return (

            <Redirect to="/"></Redirect>
        )
    }

    const { loading, success } = friend_details;

    if (!loading && success === false) {
       return(
        <div className="home">
       <LoadingSpinner color={"#643434"}/>
       </div>
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
                    <NewPost friend_id={friend_id} profile_pic={profile_pic} posted_to={friend_details.friendDetails.name} added_by={first_name + " " + last_name} />
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