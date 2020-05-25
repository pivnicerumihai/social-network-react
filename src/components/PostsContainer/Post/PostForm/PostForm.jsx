import React, { useState } from "react";
import {post} from "../../../../redux/actions/post.action";
import {useSelector, useDispatch} from "react-redux";

const PostForm = (props) => {

    const [comment, setComment] = useState("");

    const {post_id} = props;

    const { firstName,lastName,user_id,user_pic} = useSelector(state=>({
        firstName:state.login.userDetails.first_name,
        lastName:state.login.userDetails.last_name,
        user_id:state.login.userDetails._id,
        user_pic:state.login.userDetails.profile_pic
    }))
    const dispatch = useDispatch();


    const handlePostComment = (e) => {
        e.preventDefault();
        const newComment = {
            body:comment,
            post_id:post_id,
            user:firstName + " " + lastName,
            user_id:user_id,
            user_pic:user_pic,
            deleted:false,
            likes:0
        }
        dispatch(post("http://localhost:3001/comments/postComment",newComment))
    }

    return (
        <form className="post_comment" onSubmit={handlePostComment}>
            <textarea placeholder="Write a Comment"
                value={comment}
                onChange={e => setComment(e.target.value)}>
            </textarea>
            <input type="Submit" defaultValue="Add Comment" />
        </form>
    )
}

export default PostForm;