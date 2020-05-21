const INITIAL_STATE = {
    loading: false,
    success:false,
    friendDetails: {},
    error: ""
}

const getFriendDetailsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "GET_FRIEND_DETAILS_REQUEST":
            return {
                ...state, loading: true
            }
            case "GET_FRIEND_DETAILS_SUCCESS":
                return {
                        loading: false,
                        success:true,
                        friendDetails: action.payload,
                        error: ""
                }
            case "GET_FRIEND_DETAILS_FAILURE":
                return {
                    ...state,
                    success:false,
                    loading:false,
                    error:''
                }    
            default:
                return state;
    }

}

export default getFriendDetailsReducer;