import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { post } from "../../redux/actions/post.action";
import { updateUser } from "../../redux/actions/login.action";

function ProfileBar(props) {

    const id = useSelector(state => state.login.userDetails._id);
    const user_first_name = useSelector(state => state.login.userDetails.first_name);
    const user_last_name = useSelector(state => state.login.userDetails.last_name);
    const user_profile_pic = useSelector(state => state.login.userDetails.profile_pic);
    const [selectedFile, setSelectedFile] = useState(null);
    const [displayInput, setDisplayInput] = useState(false);
    const [sentFriendRequest, setSentFriendRequest] = useState(false);
    const [friendDropdown, setFriendDropdown] = useState(false);
    const [popup, setPopup] = useState(false);
    const dispatch = useDispatch();
    const { profile_pic, friend_id, name, posts, likes } = props;
    const friend_list = useSelector(state => state.login.userDetails.friend_array);
    const friend_requests = useSelector(state => state.getFriendDetails.friendDetails.friend_requests)

    const fileUploadHandler = () => {

        if (displayInput) {

            const fd = new FormData();
            fd.append("profilePicture", selectedFile);
            fd.append("id", id)
            dispatch(post(`http://localhost:3001/uploadNewProfilePic`, fd))
                .then(dispatch(updateUser(id)))
            setDisplayInput(false);
        }
        else {
            setDisplayInput(true);
        }
    }

    const toggleFriendDropdown = () => {
        setFriendDropdown(!friendDropdown);

    }
    const togglePopUp = () => {
        setPopup(!popup);
    }
    const removeFriend = (user_id, friend_id) => {
        dispatch(post("http://localhost:3001/removeFriend", user_id, friend_id)).then(()=>setPopup(false));
    }

    const addFriend = (friend_id) => {
        const User = {
            id: id,
            name: user_first_name + " " + user_last_name,
            profile_pic: user_profile_pic
        }
        dispatch(post("http://localhost:3001/addFriend", { User, friend_id }));
    }

    let friendship;
    let popupText;
    if (friend_id) {
        if (friend_list.includes(friend_id)) {
            friendship = <div className="add-friend">
                <button className="add-friend-button" onClick={toggleFriendDropdown}>Friends</button>
                <br />
                {friendDropdown ? <button className="add-friend-button-2" onClick={togglePopUp}>Remove Friend</button> : null}
            </div>;
            popupText = <div className="pop-up">
                <div className="pop-up-text"><p>Are you sure you want to remove {name} from your friends?</p>
                    <br />
                    <button onClick={()=>removeFriend({ id, friend_id })}>Yes</button><button onClick={() => { setPopup(false); setFriendDropdown(false) }}>No</button>
                </div>
            </div>
        }
        else {

            if (friend_requests.some(e => e.id === id) || sentFriendRequest === true) {
                friendship = <button className="add-friend-button">Friend Request Sent</button>
            }
            else {
                friendship = <button className="add-friend-button" onClick={() => addFriend(friend_id)}>Send Friend Request</button>
            }

        }
    }
    return (
        <div className="profile_bar">
            <div className="user_pic">
                <img className="profile_pic" src={profile_pic} alt="Not loaded" />
                <br />
                {friend_id ? friendship : <div className="profile_pic_upload">
                    <label htmlFor="upload-photo" onClick={fileUploadHandler}>Upload profile picture</label>
                    <input id="upload-photo" type="file" onChange={e => { setSelectedFile(e.target.files[0]) }} />
                </div>
                }


            </div>
            <div className="user_info">
                <span>{name}</span>
                <br /> <br /><br />
                <span className="num_posts">Number of posts: {posts} </span>
                <br />
                <span className="num_posts">Number of likes: {likes}</span>
            </div>
            {popup ? popupText : null}
        </div>
    )
}

export default ProfileBar;