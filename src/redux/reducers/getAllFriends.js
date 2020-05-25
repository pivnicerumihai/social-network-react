const INITIAL_STATE = {
    loading: false,
    all_friends: [],
    error: ""
}

const getAllFriendsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "GET_ALL_FRIENDS_REQUEST":
            return {
                ...state,
                loading: true,
            }
            case "GET_ALL_FRIENDS_SUCCESS":
                return {
                    ...state,
                    all_friends: action.payload,
                        error: ""
                }
                case "GET_ALL_FRIENDS_FAILURE":
                    return {
                        ...state,
                        error: action.payload
                    }
                    default:
                        return state;
    }
}

export default getAllFriendsReducer;