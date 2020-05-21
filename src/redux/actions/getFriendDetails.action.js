import axios from "axios";

const getFriendDetailsRequest = () =>{
    return{
        type:"GET_FRIEND_DETAILS_REQUEST"
    }
}

const getFriendDetailsSuccess = (friendDetails) =>{
    return{
        type:"GET_FRIEND_DETAILS_SUCCESS",
        payload:friendDetails
    }
}

const getFriendDetailsFailure = (error) =>{
    return{
        type: "GET_FRIEND_DETAILS_FAILURE",
        payload:error
    }
}

export const getFriendDetails = (friendId) =>{
    return async (dispatch)=>{
        dispatch(getFriendDetailsRequest);
        try{
            const res = await axios.get(`http://localhost:3001/friendDetails?friendId=${friendId}`)
            dispatch(getFriendDetailsSuccess(res.data));
        }
        catch(err){
            const error = err.message;
            dispatch(getFriendDetailsFailure(error))
        }
    }
}