import React from "react";
import { deletePost } from "../../../redux/actions/deletePost.action";
import { getPosts } from "../../../redux/actions/getPosts.action";
import { useDispatch, useSelector } from "react-redux";


function Post(props) {
    
    const dispatch = useDispatch();

    const user_id = useSelector(state => state.login.userDetails._id);

    const handleDeletePost = () => {
        dispatch(deletePost(props.id, user_id)).then(dispatch(getPosts(user_id)))
    }

    if (props.posted_to.length === 0) {
        return (
            <div className="post">
                <h4>{props.posted_by} <span onClick={handleDeletePost}>x</span></h4>
                <p>{props.post_body}</p>
            </div>
        )
    }
    else if (props.posted_to.length === 1) {
        return (
            <div className="post">
                <h4>{props.posted_by} &#62;  {props.posted_to} <span onClick={handleDeletePost}>x</span></h4>
                <p>{props.post_body}</p>
            </div>
        )
    }
    else {
        return (
            <div className="post">
                <h4>{props.posted_by} &#62; More <span onClick={handleDeletePost}>x</span></h4>
                <p>{props.post_body}</p>
            </div>
        )
    }
}

export default Post;