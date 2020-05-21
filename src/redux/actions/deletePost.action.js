import axios from "axios";

const deletePostRequest = () => {
    return {
        type: "DELETE_POST_REQUEST"
    }
}

const deletePostSuccess = (res) => {
    return {
        type: "DELETE_POST_SUCCESS",
        payload:res
    }
}

const deletePostFailure = (err) => {
    return {
        type: "DELETE_POST_FAILURE",
        payload: err
    }
}

export const deletePost = (postId, userId) => {
    return async (dispatch) => {
        dispatch(deletePostRequest);
        try {
            const res = await axios.get(`http://localhost:3001/deletePost?postId=${postId}&userId=${userId}`);
            dispatch(deletePostSuccess(res.data));
            return res;
        } catch (err) {
            const errorMessage = err.message;
            dispatch(deletePostFailure(errorMessage));
            return errorMessage;
        }
    }
}