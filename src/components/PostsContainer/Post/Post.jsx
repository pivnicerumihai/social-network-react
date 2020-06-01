import React, { Fragment, useState } from "react";
import Comments from "./Comments/Comments"
import PostForm from "./PostForm/PostForm";
import { deletePost } from "../../../redux/actions/deletePost.action";
import { post } from "../../../redux/actions/post.action";
import { getPosts } from "../../../redux/actions/getPosts.action";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit,faBan } from '@fortawesome/free-solid-svg-icons'

function Post(props) {
    const { post_id, posted_to, added_by_pic, added_by_id, posted_by, post_body, profile_pic, user_to_id,comments } = props;
    const [commentsDropdown, toggleCommentsDropdown] = useState(false);
    const [editing, setEditing] = useState(false);
    const [editedPost, setEditedPost] = useState(null);
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


    const handleEditPost = (post_id,post_content) => {
        return function(e){
            e.preventDefault();
            dispatch(post("http://localhost:3001/posts/editPost",{post_id,post_content}))
            .then((res)=>{
                if(res.status === 200){
                    dispatch(getPosts(user_id)).then(()=>setEditing(false));
                  
                }
            });

        }
    }

    return (

        <div className="post">
            <div className="post-by">
            <Link className="link" style={{ textDecoration: "none" }} to={added_by_id}>
                <img src={added_by_pic} alt="Not loaded"></img>
                    <h4>{posted_by}</h4>
                </Link>
                {added_by_id === user_id ? 
                <Fragment>
                    <span className="edit_post"
                     onClick={()=>{
                        setEditing(!editing);
                        setEditedPost(post_body)
                    }}><FontAwesomeIcon icon={faEdit}/>
                    </span>
                    <span className= "delete_post"
                     onClick={handleDeletePost}>
                         <FontAwesomeIcon icon={faBan}/>
                         </span> 
                         </Fragment>
                : null}
            </div>
            <div className="post-body">{editing ? 
            <form onSubmit={handleEditPost(post_id,editedPost)}>
                <textarea 
                value={editedPost}
                onChange={ e => setEditedPost(e.target.value)}
                ></textarea>
                <br/>
                <input type="submit" value="Save Post"/>
            </form> 
            : 
            post_body}
            </div>
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
                    {comments.length > 0 ? `See Comments(${comments.length})` : "Add Comment"}
                    </button>

            }

        </div>
    )
}



export default Post;