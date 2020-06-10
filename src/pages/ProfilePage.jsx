import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../redux/actions/login.action";

import ProfileBar from "../components/ProfileBar/ProfileBar";
import NewPost from "../components/NewPost/NewPost";
import PostsContainer from "../components/PostsContainer/PostsContainer";
import FriendsBar from "../components/FriendsBar/FriendsBar";

function ProfilePage(props) {
    const userDetails = useSelector(state => state.login.userDetails);
    const userPosts = useSelector(state => state.getPosts.posts);

    const { _id, first_name, last_name, num_likes, num_posts, profile_pic, friend_array,theme } = userDetails;
    const name = first_name + " " + last_name;
    const dispatch = useDispatch();
    

    useEffect(() => {
        dispatch(updateUser(_id))
    }, [_id, dispatch, userPosts,theme])
    return (
     
        <div className="home">
            <div className="left-container">
                <ProfileBar
                    name={name}
                    likes={num_likes}
                    posts={num_posts}
                    profile_pic={profile_pic} />
             <FriendsBar id={_id} />
            </div>

            <div className="right-container">
            <NewPost id={_id} added_by={name} friends={friend_array} />
                <PostsContainer id={_id} user_to={name} />
               
            </div>
        </div>
    )

}

export default ProfilePage;