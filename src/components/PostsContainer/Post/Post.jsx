import React, { Fragment, useState } from "react";
import Comments from "./Comments/Comments"
import PostForm from "./PostForm/PostForm";
import { deletePost } from "../../../redux/actions/deletePost.action";
import { getPosts } from "../../../redux/actions/getPosts.action";
import { getComments } from "../../../redux/actions/getComments.action";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";


function Post(props) {
    const { id, posted_to, added_by_pic, added_by_id, posted_by, post_body, profile_pic, user_to_id } = props;
    const [commentsDropdown, toggleCommentsDropdown] = useState(false);
    const dispatch = useDispatch();

    const user_id = useSelector(state => state.login.userDetails._id);
    const comments = useSelector(state => state.getComments.comments);

    const handleDeletePost = () => {
        dispatch(deletePost(id, user_id))
            .then((res) => {
                if (res.data === "Post deleted!") {
                    dispatch(getPosts(user_id))
                }
            })
    }

    if (posted_to.length === 0) {
        return (
            <div className="post">
                <div className="post-by">
                    <img src={added_by_pic} alt="Not loaded"></img>
                    <Link className="link" style={{ textDecoration: "none" }} to={added_by_id}>
                        <h4>{posted_by}</h4>
                    </Link>
                    {added_by_id === user_id ? <span onClick={handleDeletePost}>x</span> : null}
                </div>
                <p>{post_body}</p>
                <div className="posted-to"></div>
                {commentsDropdown ? <div className="comments-container">
                    {comments.body !== undefined ?
                        comments.body.map((el, i) => {
                            return (
                            <Comments 
                            body={el} 
                            likes={comments.likes[i]}
                            post_id={comments.post_id[i]}
                            user={comments.user[i]}
                            user_id ={comments.user_id[i]}
                            user_pic = {comments.user_pic[i]}
                            />)
                        })
                        : null}
                    <PostForm post_id={id} />
                </div> : null}
                <button className="comments_btn"
                    style={commentsDropdown ? { marginLeft: "2.5%" } : { marginLeft: "0" }}
                    onClick={() => {
                        toggleCommentsDropdown(!commentsDropdown)
                        dispatch(getComments(id))
                    }}>{commentsDropdown ? "Close Comments" : "See Comments"}</button>

            </div>
        )
    }
    else if (posted_to.length > 0) {

        return (
            <div className="post">
                <div className="post-by">
                    <img src={added_by_pic} alt="Not loaded"></img>
                    <Link className="link" style={{ textDecoration: "none" }} to={added_by_id}>
                        <h4> {posted_by}</h4>
                    </Link>
                    {added_by_id === user_id ? <span onClick={handleDeletePost}>x</span> : null}
                </div>
                <p>{post_body}</p>
                <div className="posted-to">
                    <h5 style={{ color: "white", marginLeft: "5px", alignSelf: "center", marginRight: "0" }}>To:</h5>
                    {posted_to.map((el, i) => {
                        return (
                            <Fragment>
                                <img src={profile_pic[i]} alt="test" />
                                <Link className="link" style={{ textDecoration: "none" }} to={user_to_id[i]}>
                                    <h4>{el}</h4>
                                </Link >
                            </Fragment>
                        )
                    })}
                </div>
                {commentsDropdown ? <div className="comments-container">
                    <Comments />
                    <PostForm post_id={id} />
                </div> : null}
                <button className="comments_btn" style={commentsDropdown ? { marginLeft: "2.5%" } : { marginLeft: "0" }} onClick={() => toggleCommentsDropdown(!commentsDropdown)}>{commentsDropdown ? "Close Comments" : "See Comments"}</button>

            </div>
        )
    }

}

export default Post;