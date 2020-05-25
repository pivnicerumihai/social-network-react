import axios from "axios";

const declineFriendRequest = () =>{
    return{
        type:"DECLINE_FRIEND_REQUEST"
    }
}

const declineFriendSuccess = () => {
    return{
        type:"DECLINE_FRIEND_SUCCESS"
    }
}

const declineFriendFailure = () => {
    return{
        type:"DECLINE_FRIEND_FAILURE"
    }
}

export const declineFriend = (user_id,friend_id) => {
    return async dispatch =>{
        dispatch(declineFriendRequest)
        try{
            const res = await axios.get(`http://localhost:3001/friend/declineFriend?id=${user_id}&friend_id=${friend_id}`)
            dispatch(declineFriendSuccess());
            return res;
        }
        catch(error){
            const errorMessage = error.message;
            dispatch(declineFriendFailure(errorMessage));
            return errorMessage;
        }
    }
}