import React, { useEffect, useState } from "react";
import { getPosts } from "../../redux/actions/getPosts.action";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Post from "./Post/Post";

function PostsContainer(props) {

  const { user_to, friend_id } = props;
  
  const { userFriends,loading, posts } = useSelector(state => ({

    loading: state.getPosts.loading,
    posts: state.getPosts.posts,
    userFriends: state.login.userDetails.friend_array 
  }))

  const [postsToLoad, setPostsToLoad] = useState(5);
  let dispatch = useDispatch();

  useEffect(() => {
    if (friend_id) {
      dispatch(getPosts(friend_id))
    }
    else {
      dispatch(getPosts(props.id))
    }
  }, [dispatch, props.id, friend_id, user_to])
  console.log("LOADING", loading)
  if (loading) {

    return (
      <div className="posts_container">
        <LoadingSpinner color={"#643434"} />
      </div>
    )
  }
  else if(friend_id && !userFriends.includes(friend_id)){
    return(
    
      <div className="not-friends">
        <h3>You can't see {props.user_to} posts yet!
        <br/>
        You must be friend in order to see {props.user_to}'s posts!
        </h3>
        </div>

    )
  }
  else {
    return (<div className="posts_container">
      {
        (posts.length !== 0) ?
          posts.map((el, i) => {
            if (i <= postsToLoad) {
              return (
                <Post key={i} post_id={el._id} comments = {el.comments} added_by_id={el.id} posted_by={el.added_by} added_by_pic={el.added_by_pic} user_to_id={el.user_to_id} profile_pic={el.user_to_pic} posted_to={el.user_to} post_body={el.body} />

              )
            }
          })
          :
          null
      }
      {
        (posts.length !== 0 && postsToLoad < posts.length) ?
          <button className="more_posts_btn" onClick={() => { setPostsToLoad(postsToLoad + 5) }}>
            {(postsToLoad < posts.length - 5) ?
              "Click to load 5 more posts ..."
              : `Click to load last posts`}
          </button>
          :
          posts.length < 5
            ?
            null
            :
            <div className="no_more_posts">There are no more posts to load!</div>

      }
      <br />
      <br />
      <br />
    </div>)
  }
}

export default PostsContainer;