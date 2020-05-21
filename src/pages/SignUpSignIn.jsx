import React from "react";

import RegistrationForm from "../components/RegistrationForm/RegistrationForm";
import SignInForm from "../components/SignInForm/SignInForm";

import { useSelector, useDispatch } from "react-redux";
import { createAccount } from "../redux/actions/hasAccount.action";

function SignUp_signIn(){

    const hasAccount = useSelector( state => state.hasAccount);
    const dispatch = useDispatch();
    return(
        <div className="form_wrapper" >
            <div className="login_header">
                <h1>Code Feed</h1>
                <p>Log In or Sign Up below!</p>
            </div>
            {hasAccount? <RegistrationForm/> : <SignInForm/> }
            <button onClick={()=>dispatch(createAccount())}>{hasAccount? "Already have an account? Sign in here!" : "Need an account? Register here!"}</button>
    
    </div>
    )
}

export default SignUp_signIn;