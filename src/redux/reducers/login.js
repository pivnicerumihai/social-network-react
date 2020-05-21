const INITIAL_STATE = {
    isLogged: false,
    userDetails:"",
    loading:false,
    error:""
}

const loginReducer = (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case "POST_LOGIN_REQUEST":
        return{
            ...state,
            loading:true
        }
        case "POST_LOGIN_SUCCESS":
            return{
                isLogged: true,
                userDetails:action.payload,
                loading:false
            }
        case "POST_LOGIN_FAILURE":
            return{
                loading:false,
                userDetails:"",
                isLogged:false,
                error:action.payload
            }
        case "LOGOUT":
            return {
                loading:false,
                userDetails:"",
                isLogged:false,
                error:""
            }
        default:
            return state;
    }
}
export default loginReducer;