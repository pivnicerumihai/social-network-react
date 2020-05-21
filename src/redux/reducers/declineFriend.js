const INITIAL_STATE = {
    loading: false,
    success: null,
    error: ""
}

const declineFriendReducer = (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case "DECLINE_FRIEND_REQUEST":
        return{
            loading:true,
            ...state
        }
        case "DECLINE_FRIEND_SUCCESS":
            return{
                loading:false,
                success:true,
                error:""
            }
        case "DECLINE_FRIEND_FAILURE":
        return{
            loading:false,
           success:false,
           error:action.payload
        }
        default:
            return state;
    }

}

export default declineFriendReducer;