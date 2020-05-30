import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { post } from "../../../../redux/actions/post.action";
import { useDispatch } from "react-redux";
import { getPosts } from "../../../../redux/actions/getPosts.action";

const Comments = (props) => {

    const { comment_id, body, post_id, user, user_id, added_by, user_pic } = props;
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
                            }}>
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
                            </Fragment>
                            : null}
                    </div>
                </Fragment>
            }

        </div>
    )
}

export default Comments;