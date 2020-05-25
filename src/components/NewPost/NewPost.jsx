import React, { useState, useEffect } from "react";
import { union } from "lodash";

import FriendsList from "./FriendsList/FriendsList";

import { useDispatch, useSelector } from "react-redux";
import { getFriendList, toggleList, closeList } from "../../redux/actions/getFriendList.action";
import { post } from "../../redux/actions/post.action";
import { getPosts } from "../../redux/actions/getPosts.action";

function NewPost(props) {

    const [postBody, setPostBody] = useState('');
    const [postedTo, setPostedTo] = useState([]);
    const [PostedToId, setPostedToId] = useState([]);
    const [friendImg, setFriendImg] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const friendList = useSelector(state => state.getFriendsList);
    const friend_name = useSelector(state => state.getFriendDetails.friendDetails.name)
    const user_to = props.user_to;
    const { user_id, user_profile_pic } = useSelector(state => ({
        user_id: state.login.userDetails._id,
        user_profile_pic: state.login.userDetails.profile_pic
    }))

    const dispatch = useDispatch();


    const handleSubmit = (e) => {
        e.preventDefault();
        if (props.friend_id) {

            const newPost = {
                id: user_id,
                body: postBody,
                added_by: props.added_by,
                added_by_pic: user_profile_pic,
                user_to_id: props.friend_id,
                user_to: props.posted_to,
                user_to_pic: props.profile_pic,
                user_closed: false,
                deleted: false,
                likes: 0
            }
            dispatch(post("http://localhost:3001/posts/createNewPost", newPost))
                .then(res => {
                    if (res.data === "Post saved") {
                        dispatch(getPosts(props.friend_id))
                    }
                    setPostBody("");
                    setFriendImg([]);
                    setPostedTo([]);
                    setPostedToId([]);
                    dispatch(closeList())
                }
                )
        }
        else {
            const newPost = {
                id: user_id,
                body: postBody,
                added_by: props.added_by,
                added_by_pic: user_profile_pic,
                user_to: postedTo,
                user_closed: false,
                user_to_id: PostedToId,
                user_to_pic: friendImg,
                deleted: false,
                likes: 0
            }
            dispatch(post("http://localhost:3001/posts/createNewPost", newPost))
                .then(res => {
                    if (res.data === "Post saved") {
                        dispatch(getPosts(user_id))
                    }
                })
            setPostBody("");
            setFriendImg([]);
            setPostedTo([]);
            setPostedToId([]);
            dispatch(closeList())
        }
    }

    useEffect(() => {
        if (searchValue.length > 0) {
            dispatch(getFriendList(props.id, searchValue));
        }
    }, [searchValue, props.id, dispatch])

    const handlePostToClick = () => {
        dispatch(getFriendList(props.id, searchValue));
        dispatch(toggleList())
    }



    return (
        <form className="post_form" onSubmit={handleSubmit} >
            <textarea placeholder="Enter post content here" cols="120" rows="10"
                value={postBody} required
                onChange={e => setPostBody(e.target.value)}></textarea>
            <br />
            <div className="post_btns">
                {!props.friend_id ?
                    <input type="submit" value="Create Post" />
                    :
                    <input type="submit" value={`Post to ${friend_name}`} />}
                {!props.friend_id ?
                    <div>
                        <input type="button" value="Post To:" onClick={handlePostToClick}></input>
                        <br />
                        <div className="post_to_friend">
                            {friendList.showInputText ?
                                <input type="text" placeholder="Search Friend Name"
                                    value={searchValue} onChange={e => setSearchValue(e.target.value)} />
                                : null}
                            {friendList.showComponent && friendList.friendsList.name !== undefined ? friendList.friendsList.name.map((el, i) => {
                                return <div key={i} >
                                    <FriendsList click={() => {
                                        let profile_pic = friendList.friendsList.profile_pic[i];
                                        let posted_to_id = friendList.friendsList.user_id[i];
                                        if (!postedTo.includes(el)) {
                                            {
                                                setPostedTo(union([...postedTo, el]));
                                                setFriendImg(union([...friendImg, profile_pic]))
                                                setPostedToId(union([...PostedToId, posted_to_id]))
                                            }
                                        }
                                        else {

                                            setPostedTo(union(postedTo.filter(arr => arr !== el)));
                                            setFriendImg(union(friendImg.filter(arr => arr !== profile_pic)))
                                            setPostedToId(union(friendImg.filter(arr => arr !== posted_to_id)))


                                        }
                                    }}
                                        profile_pic={friendList.friendsList.profile_pic[i]} name={el} />
                                </div>
                            })
                                :
                                null
                            }
                        </div>
                    </div>
                    : null}

            </div>
        </form>

    )
}

export default NewPost;