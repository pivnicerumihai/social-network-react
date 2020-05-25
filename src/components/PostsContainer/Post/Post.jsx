import React, { Fragment } from "react";
import { deletePost } from "../../../redux/actions/deletePost.action";
import { getPosts } from "../../../redux/actions/getPosts.action";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";


function Post(props) {
    console.log("PROPS.USER_TO_ID", props.user_to_id)
    const dispatch = useDispatch();

    const user_id = useSelector(state => state.login.userDetails._id);

    const handleDeletePost = () => {
        dispatch(deletePost(props.id, user_id))
            .then((res) => {
                if (res.data === "Post deleted!") {
                    dispatch(getPosts(user_id))
                }
            })
    }

    if (props.posted_to.length === 0) {
        return (
            <div className="post">
                <div className="post-by">
                    <img src={props.added_by_pic} alt="Not loaded"></img>
                    <Link className="link" style={{ textDecoration: "none" }} to={props.added_by_id}>
                        <h4>{props.posted_by}</h4>
                        </Link>
                    <span onClick={handleDeletePost}>x</span>
                </div>
                <p>{props.post_body}</p>
                <div className="posted-to"></div>
            </div>
        )
    }
    else if (props.posted_to.length > 0) {

        return (
            <div className="post">
                <div className="post-by">
                    <img src={props.added_by_pic} alt="Not loaded"></img>
                    <Link className="link" style={{ textDecoration: "none" }} to={props.added_by_id}>  
                    <h4> {props.posted_by}</h4>
                     </Link>
                    <span onClick={handleDeletePost}>x</span>
                </div>
                <p>{props.post_body}</p>
                <div className="posted-to">
                    <h5 style={{ color: "white", marginLeft: "5px", alignSelf: "center", marginRight: "0" }}>To:</h5>
                    {props.posted_to.map((el, i) => {
                        return (
                            <Fragment>
                                <img src={props.profile_pic[i]} alt="test" />
                                <Link className="link" style={{ textDecoration: "none" }} to={props.user_to_id[i]}>
                                    <h4>{el}</h4>
                                </Link >
                            </Fragment>
                        )
                    })}
                </div>

            </div>
        )
    }

}

export default Post;