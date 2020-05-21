const INITIAL_STATE = {
    loading: false,
    success: null,
    error: ""
}

const acceptFriendReducer = (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case "ACCEPT_FRIEND_REQUEST":
        return{
            loading:true,
            ...state
        }
        case "ACCEPT_FRIEND_SUCCESS":
            return{
                loading:false,
                success:true,
                error:""
            }
        case "ACCEPT_FRIEND_FAILURE":
        return{
            loading:false,
           success:false,
           error:action.payload
        }
        default:
            return state;
    }

}

export default acceptFriendReducer;