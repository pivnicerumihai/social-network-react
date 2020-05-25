import React, { useEffect } from "react";
import { getPosts } from "../../redux/actions/getPosts.action";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Post from "./Post/Post";

function PostsContainer(props) {

 const { user_to , friend_id} = props;

  const { loading, posts } = useSelector(state => ({
    
    loading: state.getPosts.loading,
    posts: state.getPosts.posts,
  }))


  let dispatch = useDispatch();

  useEffect(() => {
    if (friend_id) {
      dispatch(getPosts(friend_id, user_to))
    }
    else {
      dispatch(getPosts(props.id,null))
    }
  }, [dispatch, props.id,friend_id,user_to])


  if (loading) {
    return (
     <LoadingSpinner/>
    )
  }
  else {
    return (<div className="posts_container">
      {(posts.length !== 0) ? posts.map((el, i) => {
        return <Post key={i} id={el._id} added_by_id={el.id} posted_by={el.added_by} added_by_pic={el.added_by_pic} user_to_id={el.user_to_id} profile_pic={el.user_to_pic} posted_to={el.user_to} post_body={el.body} />
      }) : null}

    </div>)
  }



}

export default PostsContainer;