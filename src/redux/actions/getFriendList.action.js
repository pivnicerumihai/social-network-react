import axios from "axios";

const getFriendsListRequest = ()=>{
    return{
        type:"GET_FRIENDS_LIST_REQUEST"
    }
}

const getFriendsListSuccess = posts =>{
    return{
        type:"GET_FRIENDS_LIST_SUCCESS",
        payload:posts
    }
}

const getFriendsListFailure = error =>{
    return{
        type: "GET_FRIENDS_LIST_FAILURE",
        payload:error
    }
}

export const toggleList = () =>{
    return{
        type:"TOGGLE_LIST"
    }
}


export const getFriendList = (id,search) =>{
    return async (dispatch) =>{
        dispatch(getFriendsListRequest);

        try {
            const res = await axios.get(`http://localhost:3001/getFriendsList?id=${id}&searchString=${search.toLowerCase()}`);
            const friendsList = res.data;

            dispatch(getFriendsListSuccess(friendsList));
        }
        catch (err) {
            const errorMessage = err.message;
            dispatch(getFriendsListFailure(errorMessage));
        }
    }
}