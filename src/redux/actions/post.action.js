import axios from "axios";

const postRequest = () =>{
    return{
        type:"POST_REQUEST"
    }
}

const postSuccess = () =>{
    return{
        type:"POST_SUCCESS",
    }
}

const postFailure = error =>{
    return{
        type: "POST_FAILURE",
        payload:error
    }
}

export const post = (url,newPost) =>{
    return async (dispatch) =>{
        dispatch(postRequest);
       try {
            const res = await axios.post(url, newPost);
            dispatch(postSuccess(res.data));
            return res;
        }
        catch (err) {
            const errorMessage = err.message;
            dispatch(postFailure(errorMessage));
            return errorMessage;
        }
      
    }
}