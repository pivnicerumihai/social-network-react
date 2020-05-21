import React,{useState} from "react";
import {useDispatch,useSelector} from 'react-redux';
import {postLogin} from "../../redux/actions/login.action";

function SignInForm(){

    const [login_email,setLogin_email] = useState("");
    const [login_password,setLogin_password] = useState("");
   const error = useSelector(state=>state.login.error)
    const dispatch = useDispatch();

    const handleSubmit = (e)=>{
        e.preventDefault();

        const loginCredentials = {
            email:login_email,
            password:login_password
        }
        
        dispatch(postLogin(loginCredentials));
    }

    return(
        <form className="login_form" onSubmit={e=>handleSubmit(e)}>
            <input type="email" name="login_email" placeholder="E-mail Address" onChange={e => setLogin_email(e.target.value)}/>
            <br/>
            <input type="password" name="login_password" placeholder="Password" onChange={e => setLogin_password(e.target.value)}/>
            <br/>
            <input type="submit" value="Sign In"/>  
            {error === "Email or password are incorrect!" ? <p>Email or password are incorrect</p> : null}
        </form>
    )
    
}
export default SignInForm;