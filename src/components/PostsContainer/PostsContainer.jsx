import React, { useEffect, useState } from "react";
import { getPosts } from "../../redux/actions/getPosts.action";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Post from "./Post/Post";

function PostsContainer(props) {

  const { user_to, friend_id } = props;

  const { userFriends, loading, posts } = useSelector(state => ({

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
  else if (friend_id && !userFriends.includes(friend_id)) {
    return (

   null

    )
  }
  else {
    return (<div className="posts_container">
      {
        (posts.length !== 0) ?
          posts.map((el, i) => {
            if (i <= postsToLoad) {
              return (
                <Post key={i}
                  post_id={el._id}
                  comments={el.comments}
                  added_by_id={el.added_by.id}
                  added_by_pic={el.added_by.profile_pic}
                  added_by_name = {el.added_by.name}
                  date_added={el.date_added}
                  posted_by={el.added_by}
                  added_to = {el.added_to}
                  deleted = {el.deleted}
                  post_body={el.body} />
              )
            }
            else {
              return null;
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