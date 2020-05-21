import React, { useState, useEffect } from "react";
import { union } from "lodash";

import FriendsList from "./FriendsList/FriendsList";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

import { useDispatch, useSelector } from "react-redux";
import { getFriendList, toggleList } from "../../redux/actions/getFriendList.action";
import { post } from "../../redux/actions/post.action";
import { getPosts } from "../../redux/actions/getPosts.action";

function NewPost(props) {

    const [postBody, setPostBody] = useState('');
    const [postedTo, setPostedTo] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const searchInput = useSelector(state => state.searchFriend)
    const friendList = useSelector(state => state.getFriendsList);
    const friend_name = useSelector(state => state.getFriendDetails.friendDetails.name)
    const user_to = props.user_to;
    const user_id = useSelector(state => state.login.userDetails._id )
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (props.friend_id) {

            const newPost = {
                id: user_id,
                body: postBody,
                added_by: props.added_by,
                user_to: props.posted_to,
                user_closed: false,
                deleted: false,
                likes: 0
            }
            dispatch(post("http://localhost:3001/createNewPost", newPost))
             .then(() => dispatch(getPosts(user_id, friend_name)))
            setPostBody("");
        }
        else {
            const newPost = {
                id: user_id,
                body: postBody,
                added_by: props.added_by,
                user_to: postedTo,
                user_closed: false,
                deleted: false,
                likes: 0
            }
            dispatch(post("http://localhost:3001/createNewPost", newPost))
                .then(() => dispatch(getPosts(user_id, user_to)))
            setPostBody("");
        }
    }

    useEffect(() => {
        if (searchValue.length > 0) {
            dispatch(getFriendList(props.id, searchValue));
        }
    }, [searchValue, props.id, dispatch])

    const handlePostToClick = () => {
        dispatch(getFriendList(props.id, searchInput));
        dispatch(toggleList())
    }



    return (
        <form className="post_form" onSubmit={handleSubmit} >
            <textarea placeholder="Enter post content here" cols="120" rows="10" value={postBody} required onChange={e => setPostBody(e.target.value)}></textarea>
            <br />
            <div className="post_btns">
                {!props.friend_id ? <input type="submit" value="Create Post" /> : <input type="submit" value={`Post to ${friend_name}`} />}

                {!props.friend_id ?
                    <div>
                        <input type="button" value="Post To:" onClick={handlePostToClick}></input>
                        <br />
                        <div className="post_to_friend">
                            {friendList.showInputText ?
                                <input type="text" placeholder="Search Friend Name" value={searchValue} onChange={e => setSearchValue(e.target.value)} />
                                : null}
                            {friendList.showComponent && friendList.friendsList.name !== undefined ? friendList.friendsList.name.map((el, i) => {
                                return <div key={i} ><FriendsList click={() => { setPostedTo(union([...postedTo, el])) }} profile_pic={friendList.friendsList.profile_pic[i]} name={el} /></div>
                            }) : null}
                        </div>
                    </div>
                    : null}

            </div>
        </form>

    )
}

export default NewPost;