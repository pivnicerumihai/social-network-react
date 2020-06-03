import React from "react";
import { faSlidersH, faHome, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

const PreviewThemeBox = (props) => {
    const { first_name, last_name, num_posts, num_likes, friend_array, profile_pic } = useSelector(state => state.login.userDetails);
    const { primary_color, hover_color, secondary_color, shadow, third_color } = props.colors;


    return (
        <div className="preview_theme_container">
            <div className="preview_navbar" style={{ backgroundColor: `${primary_color}` }}>
                <div className="preview_logo" style={{ backgroundColor: `${primary_color}`, color: `${secondary_color}`, textShadow: `4px 4px ${shadow}` }}>Codefeed</div>
                <div className="preview_search_bar">Search people</div>
                <div className="preview_icons">
                    <FontAwesomeIcon style={{ color: `${secondary_color}` }} className="icon" icon={faHome} />
                    <FontAwesomeIcon style={{ color: `${secondary_color}` }} className="icon" icon={faUsers} />
                    <FontAwesomeIcon style={{ color: `${secondary_color}` }} className="icon" icon={faSlidersH} />
                </div>
            </div>
            <div className="preview_top_container" style={{ borderColor: `${primary_color}`, backgroundColor: `${secondary_color}` }}>
                <img src={profile_pic}></img>
                <p className="preview_upload_pic_btn" style={{ backgroundColor: `${secondary_color}`, borderColor: `${primary_color}` }}>Select Profile Picture</p>
                <p className="preview_num_posts" style={{ color: `${primary_color}` }}>Number of posts: {num_posts}</p>
                <p className="preview_num_likes" style={{ color: `${primary_color}` }}>Number of likes: {num_likes}</p>
            </div>
            <div className="preview_create_post" style={{ borderColor: `${primary_color}` }}>
            </div>
            <div className="preview_create_btn" style={{ borderColor: `${primary_color}`, color: `${primary_color}`, backgroundColor: `${secondary_color}` }}>Create Post</div>
            <div className="preview_post_btn" style={{ borderColor: `${primary_color}`, color: `${primary_color}`, backgroundColor: `${secondary_color}` }}>Post to:</div>
            <div className="preview_friends_bar" style={{ backgroundColor: `${secondary_color}` }}>
                <p style={{ backgroundColor: `${primary_color}`, width: "100%" }}>Friend List</p>
                <div class="preview_friend" style={{ borderColor: `${primary_color}` }}>
                    <div className="preview_friend_pic"></div>
                    <p className="preview_friend_name" style={{ color: `${primary_color}` }}>Friend Name</p>
                </div>
                <div class="preview_friend">
                    <div className="preview_friend_pic"></div>
                    <p className="preview_friend_name" style={{ color: `${primary_color}` }}>Friend Name</p>
                </div>
                <div class="preview_friend">
                    <div className="preview_friend_pic"></div>
                    <p className="preview_friend_name" style={{ color: `${primary_color}` }}>Friend Name</p>
                </div>
                <div class="preview_friend">
                    <div className="preview_friend_pic"></div>
                    <p className="preview_friend_name" style={{ color: `${primary_color}` }}>Friend Name</p>
                </div>
                <div class="preview_friend">
                    <div className="preview_friend_pic"></div>
                    <p className="preview_friend_name" style={{ color: `${primary_color}` }}>Friend Name</p>
                </div>
            </div>
            <div class="preview_post_container">
                <div className="preview_post">
                    <div className="preview_posted_by" style={{ backgroundColor: `${primary_color}` }}>
                        <img src={profile_pic} />
                        <p style={{ color: `${secondary_color}` }}>{first_name + " " + last_name}</p>
                    </div>
                    <div className="preview_post_body" style={{ backgroundColor: `${secondary_color}`, color: `${primary_color}` }}>
                        Previewing my theme!
            </div>
                    <div className="preview_posted_to" style={{ backgroundColor: `${primary_color}` }}>
                    </div>
                </div>
                <div className="preview_comment_btn" style={{backgroundColor:`${primary_color}`,color:`${secondary_color}`}}>
            See Comments
            </div>
           
            </div>
          
        </div>
    )
}

export default PreviewThemeBox;