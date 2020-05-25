import axios from "axios";

const getAllFriendsRequest = () => {
    return {
        type: "GET_ALL_FRIENDS_REQUEST"
    }
}

const getAllFriendsSuccess = friendList => {
    return {
        type: "GET_ALL_FRIENDS_SUCCESS",
        payload: friendList
    }
}

const getAllFriendsFailure = error => {
    return {
        type: "GET_ALL_FRIENDS_FAILURE",
        payload: error
    }
}

export const getAllFriends = (id) => {
    return async (dispatch) => {
        dispatch(getAllFriendsRequest);

        try {
            const res = await axios.get(`http://localhost:3001/user/getAllFriends?id=${id}`);
            const friendsList = res.data;
            dispatch( getAllFriendsSuccess(friendsList));
        } catch (err) {
            const errorMessage = err.message;
            dispatch( getAllFriendsFailure(errorMessage));
        }
    }
}