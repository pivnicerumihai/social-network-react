import React, { Fragment, useState } from "react";
import Comments from "./Comments/Comments"
import PostForm from "./PostForm/PostForm";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import { deletePost } from "../../../redux/actions/deletePost.action";
import { getPosts } from "../../../redux/actions/getPosts.action";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";


function Post(props) {
    const { post_id, posted_to, added_by_pic, added_by_id, posted_by, post_body, profile_pic, user_to_id,comments } = props;
    const [commentsDropdown, toggleCommentsDropdown] = useState(false);
    const dispatch = useDispatch();

    const user_id = useSelector(state => state.login.userDetails._id);


    const handleDeletePost = () => {
        dispatch(deletePost(post_id, user_id))
            .then((res) => {
                if (res.data === "Post deleted!") {
                    dispatch(getPosts(user_id))
                }
            })
    }
    return (

        <div className="post">
            <div className="post-by">
                <img src={added_by_pic} alt="Not loaded"></img>
                <Link className="link" style={{ textDecoration: "none" }} to={added_by_id}>
                    <h4>{posted_by}</h4>
                </Link>
                {added_by_id === user_id ? <span onClick={handleDeletePost}>x</span> : null}
            </div>
            <p className="post-body">{post_body}</p>
            {posted_to.length === 0 ?
                <div className="posted-to"></div>
                :
                <div className="posted-to">
                    <h5 style={{ color: "white", marginLeft: "5px", alignSelf: "center", marginRight: "0" }}>To:</h5>
                    {posted_to.map((el, i) => {
                        return (

                            <Fragment key={i}><img src={profile_pic[i]} alt="test" />
                                <Link className="link" style={{ textDecoration: "none" }} to={user_to_id[i]}>
                                    <h4>{el}</h4>
                                </Link >
                                
                            </Fragment>
                        )
                    })}
                </div>
                }
                {commentsDropdown ? <div className="comments-container">
                    {comments.length > 0 ? 
                    comments.map((el,i)=>{
                        return (
                            <Comments  key={i}
                            user_id={user_id}
                            comment_id={el.id}
                            body={el.body} 
                            post_id={post_id} 
                            user={el.user}
                            added_by={el.user_id} 
                            user_pic={el.user_pic}
                             />
                        )
                    }): null}
                <PostForm post_id={post_id} />
            </div> : null}
            {commentsDropdown ?
                <button className="comments_btn"
                    style={{ marginLeft: "2.5%" }}
                    onClick={() => {
                        toggleCommentsDropdown(!commentsDropdown)
                    }}>
                    Close Comments
                </button>
                :
                <button className="comments_btn"
                    style={{ marginLeft: "0" }}
                    onClick={() => {
                        toggleCommentsDropdown(!commentsDropdown)

                    }}>
                    See Comments ({comments.length})
                    </button>

            }

        </div>
    )
}



export default Post;