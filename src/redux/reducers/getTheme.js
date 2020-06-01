const INITIAL_STATE = {
    sucess:null,
    loading:false,
    error:""
}

const getThemeReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case "GET_THEME_REQUEST":
            return {
                ...state, loading: true
            }
            case "GET_THEME_SUCCESS":
                return {
                        loading: false,
                        success:true,
                        error: ""
                }
            case "GET_THEME_FAILURE":
                return {
                    ...state,
                    loading:false,
                    error:action.payload
                }    
            default:
                return state;
    }
}

export default getThemeReducer;