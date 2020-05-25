import axios from "axios";

const getCommentsRequest = () => {
    return {
        type: "GET_COMMENTS_REQUEST"
    }
}

const getCommentsSuccess = comments => {
    return {
        type: "GET_COMMENTS_SUCCESS",
        payload: comments
    }
}

const getCommentsFailure = error => {
    return {
        type: "GET_COMMENTS_FAILURE",
        payload: error
    }
}


export const getComments = (id) => {
    return async (dispatch) => {
        dispatch(getCommentsRequest);
        try {
            const res = await axios.get(`http://localhost:3001/comments/getComments?id=${id}`);
            const comments = res.data;
            dispatch(getCommentsSuccess(comments));
            return res;
        } catch (err) {
            const errorMessage = err.message;
            dispatch(getCommentsFailure(errorMessage));
        }
    }
}