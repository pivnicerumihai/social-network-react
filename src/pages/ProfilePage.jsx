import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../redux/actions/login.action";
import {getTheme} from "../redux/actions/getTheme.action";
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

    const changeTheme = (primary_color, hover_color, secondary_color, shadow_color, font_color, font_color2) => {
        document.body.style.setProperty("--primary-color", primary_color);
        document.body.style.setProperty("--hover-color", hover_color);
        document.body.style.setProperty("--secondary-color", secondary_color);
        document.body.style.setProperty("--shadow", shadow_color);
        document.body.style.setProperty("--font-color-1", font_color);
        document.body.style.setProperty("--font-color-2", font_color2);

    }
    useEffect(() => {
        if (theme === "Blue") {
            changeTheme("#4267B2", "#898F9C", "#e5e5e5", "#181b29", "white", "black")
        }
        else if (theme === "Classic") {
            changeTheme("#643434", "#745252", "#e5e5e5", "#291818", "white", "white")
        }
        else if (theme === "Dark") {
            changeTheme("#3a3b3c", "black", "#797b7c", "hsl(0, 7%, 13%)", "white", "black", "#bdec5")
        }
        else if (theme === "Light") {

            changeTheme("#5B7553", "#8EB897", "#C3E8BD", "rgb(19, 49, 10)", "white", "rgb(66, 83, 60)", "#bdbec5")
        }
        else{
            dispatch(getTheme(_id,theme))
            .then((res)=>{
            
                    changeTheme(res.primary_color, res.hover_color, res.secondary_color, res.shadow, "white", res.third_color)
                
         
            })
        }
        dispatch(updateUser(_id))
    }, [_id, dispatch, userPosts,theme])

    return (
     
        <div className="home">
            <div className="top-container">
                <ProfileBar
                    name={first_name + " " + last_name}
                    likes={num_likes}
                    posts={num_posts}
                    profile_pic={profile_pic} />
                <NewPost id={_id} added_by={first_name + " " + last_name} friends={friend_array} />
            </div>
            <br />
            <div className="bottom-container">
                <FriendsBar id={_id} />
                <PostsContainer id={_id} user_to={name} />
            </div>
        </div>
    )

}

export default ProfilePage;