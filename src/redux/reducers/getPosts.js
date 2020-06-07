const INITIAL_STATE = {
    loading: true,
    posts: [],
    error: ""
}

const getPostsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "GET_POSTS_REQUEST":
            return {
                ...state,
                loading: true,
            }
            case "GET_POSTS_SUCCESS":
                return {
                    loading: false,
                        posts: action.payload,
                        error: ""
                }
                case "GET_POSTS_FAILURE":
                    return {
                        ...state,
                        loading: false,
                            error: action.payload
                    }
                    default:
                        return state;
    }
}
export default getPostsReducer;