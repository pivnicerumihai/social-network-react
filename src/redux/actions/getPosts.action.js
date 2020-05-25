import axios from "axios";

const getPostsRequest = () => {
    return {
        type: "GET_POSTS_REQUEST"
    }
}

const getPostsSuccess = posts => {
    return {
        type: "GET_POSTS_SUCCESS",
        payload: posts
    }
}

const getPostsFailure = error => {
    return {
        type: "GET_POSTS_FAILURE",
        payload: error
    }
}

export const getPosts = (id, user_to) => {
    return async (dispatch) => {
          dispatch(getPostsRequest);
        try {

            const res = await axios.get(`http://localhost:3001/posts/getPosts?id=${id}&user_to=${user_to}`)
            const posts = res.data;
            dispatch(getPostsSuccess(posts));
            return res;

        } catch(err) {
           
                const errorMessage = err.message;
                dispatch(getPostsFailure(errorMessage));
                return errorMessage;
        }
    }
}