import axios from "axios";

const postLoginRequest = () =>{
    return{
        type:"POST_LOGIN_REQUEST"
    }
}

const postLoginSuccess = (userDetails) =>{
    return{
        type:"POST_LOGIN_SUCCESS",
        payload:userDetails
    }
}

const postLoginFailure = (error) => {
    return{
        type:"POST_LOGIN_FAILURE",
        payload:error
    }
}

export const logout = () =>{
    return{
        type:"LOGOUT"
    }
}

export const updateUser = (id) => {
    return async(dispatch)=>{
        dispatch(postLoginRequest);
       const res =  await axios.get(`http://localhost:3001/user/updateUserDetails?userId=${id}`)
      dispatch(postLoginSuccess(res.data))
       
        return res;
    }
}
export const postLogin = (loginCredentials) =>{
   return async (dispatch)=>{ 
    dispatch(postLoginRequest);   
    const res = await axios.post("http://localhost:3001/user/signIn",loginCredentials)
    
  .then((res)=>{
    if(res.data==="Email or password are incorrect!"){
            dispatch(postLoginFailure(res.data));
    }
    else {
            dispatch(postLoginSuccess(res.data));
    }
    return res;
}
  )
   .catch((err)=>{
       dispatch(postLoginFailure(err))
   })
   }
}