const INITIAL_STATE = {
    loading: false,
    comments: [],
    error: ""
}

const getCommentsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "GET_COMMENTS_REQUEST":
            return {
                ...state,
                loading: true
            }
            case "GET_COMMENTS_SUCCESS":
                return {
                    ...state,
                    comments: action.payload,
                        loading: false
                }
                case "GET_COMMENTS_FAILURE":
                    return {
                        ...state,
                        loading: false,
                            error: action.payload
                    }
                    default:
                        return state;
    }
}

export default getCommentsReducer;