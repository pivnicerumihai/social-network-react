import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { post } from "../../../../redux/actions/post.action";
import { useDispatch } from "react-redux";
import { getPosts } from "../../../../redux/actions/getPosts.action";

const Comments = (props) => {

    const { comment_id, body, post_id, user, user_id, added_by, user_pic, date_added } = props;
    const [edit, toggleEdit] = useState(false);
    const [commentBody, setCommentBody] = useState("");
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(post("http://localhost:3001/comments/deleteComment", { post_id, comment_id }))
            .then((res) => {
                if (res.status === 200) {
                    dispatch(getPosts(user_id))
                }
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(post("http://localhost:3001/comments/updateComment", { post_id, commentBody, comment_id }))
            .then((res) => {
                if (res.status === 200) {
                    dispatch(getPosts(user_id))
                    toggleEdit(false)
                }
            })
        
    }

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

    return (

        <div className="comment">
            {edit ?
                <Fragment>
                    <div className="comment_details">
                        <img src={user_pic}></img>
                        <Link style={{ textDecoration: "none", color: "black" }} to={added_by}> <h4>{user}</h4> </Link>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <textarea rows="7"
                            value={commentBody}
                            onChange={e => {
                                setCommentBody(e.target.value)
                            }}
                            required
                            >
                        </textarea>
                        <input type="submit" value="Save"></input>
                        <input onClick={() => toggleEdit(false)} type="button" value="Cancel Edit" />
                    </form>
                </Fragment>
                :
                <Fragment>
                    <div className="comment_details">
                        <img src={user_pic}></img>
                        <Link style={{ textDecoration: "none", color: "black" }} to={added_by} > <h5>{user}</h5> </Link>
                    </div>
                    <div className="comment_options">
                        <h5>{body}</h5>
                        {added_by === user_id ?
                            <Fragment>
                                <button onClick={() => {
                                    toggleEdit(true);
                                    setCommentBody(body);
                                }}>Edit</button>
                                <button onClick={handleDelete}>Delete</button>
                                <p className="comments_interval">{time_difference === "Just now" ? time_difference : "Added " + time_difference}</p>
                            </Fragment>
                            : null}
                    </div>
                </Fragment>
            }

        </div>
    )
}

export default Comments;