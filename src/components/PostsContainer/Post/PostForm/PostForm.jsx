import React, { useState } from "react";
import {post} from "../../../../redux/actions/post.action";
import {getPosts} from "../../../../redux/actions/getPosts.action";
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
            id:Math.random() * 1000000000,
            body:comment,
            user:firstName + " " + lastName,
            user_id:user_id,
            user_pic:user_pic,
            deleted:false,
            likes:0,
            date_added:Date.now()
        }
        dispatch(post("http://localhost:3001/comments/postComment",{post_id,newComment}))
        .then((res)=>{
            if(res.status === 200){
            setComment("");
            dispatch(getPosts(user_id))
        }})
    }

    return (
        <form className="post_comment" onSubmit={handlePostComment}>
            <textarea placeholder="Write a Comment"
                value={comment}
                onChange={e => setComment(e.target.value)}
                required>
            </textarea>
            <input type="Submit" defaultValue="Add Comment" />
        </form>
    )
}

export default PostForm;