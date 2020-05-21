import axios from "axios";

const acceptFriendRequest = () => {
    return{
        type:"ACCEPT_FRIEND_REQUEST"
    }
}

const acceptFriendSuccess = () => {
    return{
        type:"ACCEPT_FRIEND_SUCCESS",

    }
}

const acceptFriendFailure = (error) => {
    return{
        type:"ACCEPT_FRIEND_FAILURE",
        payload:error
    }
}

export const acceptFriend = (user_id, friend_id) => {
    return async dispatch =>{
        dispatch(acceptFriendRequest)
        try{
            const res = await axios.get(`http://localhost:3001/acceptFriend?id=${user_id}&friend_id=${friend_id}`)
            dispatch(acceptFriendSuccess());
            return res;
        }
        catch(error){
            const errorMessage = error.message;
            dispatch(acceptFriendFailure(errorMessage));
            return errorMessage;
        }
    }
}