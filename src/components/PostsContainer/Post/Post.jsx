import React, { Fragment, useState } from "react";
import Comments from "./Comments/Comments"
import PostForm from "./PostForm/PostForm";
import { deletePost } from "../../../redux/actions/deletePost.action";
import { post } from "../../../redux/actions/post.action";
import { getPosts } from "../../../redux/actions/getPosts.action";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faBan } from '@fortawesome/free-solid-svg-icons'
import Tooltip from "../../Tooltip/Tooltip";

function Post(props) {
    const { post_id, comments, added_by_id, added_by_pic, added_by_name, date_added, added_to, post_body } = props;
    const [commentsDropdown, toggleCommentsDropdown] = useState(false);
    const [editing, setEditing] = useState(false);
    const [editedPost, setEditedPost] = useState(null);
    const [showMore,setShowMore] = useState(false);
    const [popUp, togglePopUp] = useState(false);
    const dispatch = useDispatch();

    const user_id = useSelector(state => state.login.userDetails._id);

    const time = Math.round(Math.floor(Date.now() - date_added) / 1000);
    let time_difference;

    if (time < 60) {
        if(time  < 10){
        time_difference = "Just now";
        
    }
        else{
            time_difference = time + " seconds ago"
        }
}
    else if(time < 3600){ 
        if(Math.floor(time/60) === 1)
        time_difference = Math.floor(time/60) + " minute ago ";
        else{
            time_difference = Math.floor(time/60) + " minutes ago ";
        }

    }
    else if(time < 3600*24){ // seconds in a day
        if(Math.floor(time/3600) === 1){
            time_difference = Math.floor(time/3600) + " hour ago"
        }
        else
        {
            time_difference = Math.floor(time/3600) + " hours ago"
        }
    }
    else if(time < 3600*24*7){ //seconds in week
        if(Math.floor(time/86400) === 1){
            time_difference = Math.floor(time/86400) + " day ago"
        }
        else{
            time_difference = Math.floor(time/86400) + "days ago"
        }
    }
    else if ( time < 3600*24*7*4.3){ // seconds in a month(4,3 weeks)
        if(Math.floor(time/604800) === 1){
            time_difference = Math.floor(time/604800) + " week ago"

        }
        else{
            time_difference = Math.floor(time/604800) + " weeks ago"
        }
    }
    else if( time < (3600 * 24 * 7 * 4,3 * 12)){
        if(Math.floor(time/(3600 * 24 * 7 * 4,3 ))=== 1){
            time_difference = Math.floor(time/(3600 * 24 * 7 * 4.3)) + " month ago"
        }
        else{

            time_difference = Math.floor(time/(3600*24*7*4.3)) + " months ago"
        }
    }
    else if(Math.floor(time/(3600 * 24 * 7 * 4.3 * 12)) === 1){
        time_difference = "1 year ago";
    }
    else{
        time_difference = Math.floor(time/(3600 * 24 * 7 * 4.3 * 12)) + " years ago"
    }
        const handleDeletePost = () => {
            dispatch(deletePost(post_id, user_id))
                .then((res) => {
                    if (res.status === 200) {
                        dispatch(getPosts(user_id))
                        togglePopUp(false)
                    }
                })
        }


    const handleEditPost = (post_id, post_content) => {
        return function (e) {
            e.preventDefault();
            dispatch(post("http://localhost:3001/posts/editPost", { post_id, post_content }))
                .then((res) => {
                    if (res.status === 200) {
                        dispatch(getPosts(user_id)).then(() => setEditing(false));

                    }
                });

        }
    }

    return (

        <div className="post">
            <div className="post-by">
                <Link className="link" style={{ textDecoration: "none" }} to={added_by_id}>
                    <img src={added_by_pic} alt="Not loaded"></img>
                    <h4>{added_by_name}</h4>

                </Link>
                {added_by_id === user_id ?
                    <Fragment>
                        <span className="edit_post"
                            onClick={() => {
                                setEditing(!editing);
                                setEditedPost(post_body)
                            }}><FontAwesomeIcon icon={faEdit} />
                        </span>
                        <span className="delete_post"
                            onClick={()=>togglePopUp(true)}>
                            <FontAwesomeIcon icon={faBan} />
                        </span>
                    </Fragment>
                    : null}
            </div>
            <div className="post-body">
                {editing ?
                <form onSubmit={handleEditPost(post_id, editedPost)}>
                    <textarea
                        value={editedPost}
                        onChange={e => setEditedPost(e.target.value)}
                    ></textarea>
                    <br />
                    <input type="submit" value="Save Post" />
                </form>
                :
                post_body}
            </div>
            {added_to.length === 0 ?
                <div className="posted-to">
                    <p className="time_interval" style={{width:"100%"}}>
                        Posted {time_difference}
                        </p>
                        </div>
                :
                <div className="posted-to">
                    <h5 style={{ color: "white", marginLeft: "5px", alignSelf: "center", marginRight: "0" }}>
                        To:</h5>
                    {added_to.map((el, i) => {
                        if(i<3){
                        return (

                            <Fragment key={i}><img src={el.profile_pic} alt="test" />
                                <Link className="link" style={{ textDecoration: "none" }} to={el.id}>
                                    <h4>{el.username}</h4>
                                </Link >
                               
                            </Fragment>
                        )}
                            else{
                                return null;
                            }
                    })}
                    {added_to.length === 4 ? 
                    <Fragment>
                    <div className="posted_to_others"
                     onMouseEnter={()=>setShowMore(true)}
                     onMouseOut={()=>setShowMore(false)}>and 1 other
                    {showMore ? <Tooltip posted_to={added_to}/> : null}
                    </div >
                    </Fragment>
                    : 
                    added_to.length > 4 ?
                    <Fragment>
                    <div className="posted_to_others"
                     onMouseEnter={()=>setShowMore(true)}
                     onMouseOut={()=>setShowMore(false)}
                     > and {added_to.length - 3 } others
                    {showMore ? <Tooltip posted_to={added_to}/> : null}
                    </div >
                    </Fragment>
                    :
                    null
                    }
                     <p className="time_interval" style={{width:"100%"}}>
                        Posted {time_difference}
                        </p>
                </div>
            }
            {commentsDropdown ? <div className="comments-container">
                {comments.length > 0 ?
                    comments.map((el, i) => {
                        return (
                            <Comments key={i}
                                user_id={user_id}
                                comment_id={el.id}
                                body={el.body}
                                post_id={post_id}
                                user={el.name}
                                added_by={el.user_id}
                                user_pic={el.profile_pic}
                                date_added={el.date_added}
                            />
                        )
                    }) : null}
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
        {popUp ?  <div className="pop-up">
                <div className="pop-up-text"><p>Are you sure you want to remove delete this post?</p>
                    <br />
                    <button onClick={() => handleDeletePost()}>Yes</button><button onClick={() =>  togglePopUp(false)}>No</button>
                </div>
            </div>
            :
            null}
        </div>
    )
}



export default Post;