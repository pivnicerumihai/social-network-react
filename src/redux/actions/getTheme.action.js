import axios from "axios";

const getThemeRequest = () =>{
    return{
        type:"GET_THEME_REQUEST"
    }
}

const getThemeSuccess = (theme) =>{
    return{
        type:"GET_THEME_SUCCESS",
        payload:theme
    }
}

const getThemeFailure = (error) =>{
    return{
        type: "GET_THEME_FAILURE",
        payload:error
    }
}

export const getTheme = (user_id,theme_name) =>{
    return async (dispatch)=>{
        dispatch(getThemeRequest);
        try{
            const res = await axios.get(`http://localhost:3001/user/getCustomTheme?userId=${user_id}&themeName=${theme_name}`)
            const theme = res.data;
            
            dispatch(getThemeSuccess(theme));
            return theme;
        }
        catch(err){
            const error = err.message;
            dispatch(getThemeFailure(error))
        }
    }
}