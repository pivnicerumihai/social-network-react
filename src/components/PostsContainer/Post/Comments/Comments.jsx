import React from "react";

const Comments = (props) => {
    const { body, post_id, user, user_id, user_pic } = props;
    return(
    <div className="comment">
        <div className="comment_details">
        <img src={user_pic}></img>
        <h4>{user}</h4>
        <p> posted:</p>
        </div>
        <h5>{body}</h5>
    </div>
    )
}

export default Comments;