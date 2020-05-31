import React, { useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { post } from "../redux/actions/post.action";
import { useHistory } from "react-router-dom";

const Settings = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const userDetails = useSelector(state => state.login.userDetails)
    const { first_name, last_name, email, _id } = userDetails;
    const [formFirstName, setFormFirstName] = useState(first_name);
    const [formLastName, setFormLastName] = useState(last_name);
    const [formEmail, setFormEmail] = useState(email);
    const [formPassword, setFormPassword] = useState("");
    const [formConfirmPassword, setFormConfirmPassword] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [confirmPassword, toggleConfirmPassword] = useState(false);
    const [errors, setErrors] = useState([]);
    const [updated,setUpdated ] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        setErrors([]);
        if(formFirstName === first_name && formLastName === last_name && formEmail === email && formPassword === ""){
            setErrors(errors=>[...errors,"Nothing was modified!"])
        }
        else if(formPassword.length > 0 && formPassword.length < 8){
            setErrors(errors => [...errors, "New Password must be at least 8 characters long!"])
        }
        else if(formConfirmPassword !== formPassword){
            setErrors(errors=>[...errors, "Password do not match!"])
        }
      
        else {
        toggleConfirmPassword(true);
        setErrors([]);
        }
    }

    const handleUpdate = e => {
        e.preventDefault();
        if(formPassword.length > 0){
        const updateObject = {
            id:_id,
            first_name: formFirstName,
            last_name: formLastName,
            email: formEmail,
            new_password:formPassword,
            current_password:currentPassword
        }
        dispatch(post("http://localhost:3001/user/editUserDetails", updateObject))
        .then((res)=>{
            if(res.data === "Password is Incorrect!"){
            setErrors(errors=>[...errors,"Password is Incorrect!"])
        }
        else if(res.data=== "Updated!"){
            toggleConfirmPassword(false);
            setUpdated(true);
            setErrors([]);
            setTimeout(()=> history.push("/"),2000)
        }
    })
    }
    else{
        const updateObject = {
            id:_id,
            first_name: formFirstName,
            last_name: formLastName,
            email: formEmail,
            current_password:currentPassword,
        }
        dispatch(post("http://localhost:3001/user/editUserDetails", updateObject))
        .then((res)=>{
            if(res.data === "Password is Incorrect!"){
            setErrors(errors=>[...errors,"Password is Incorrect!"])
        }
        else if(res.data=== "Updated!"){
            toggleConfirmPassword(false);
            setUpdated(true);
            setErrors([]);
            setTimeout(()=> history.push("/"),2000)
        }
    })
    }
    }

    return (

        <div className="settings_container">

            <form className="details-form" onSubmit={handleSubmit}>
                <div className="form_title">
                    <h2>User Details</h2>
                    <h5>Edit User Details Below</h5>
                </div>
                <br />
                <label>First Name:
                    <input
                        required
                        value={formFirstName}
                        name="first_name"
                        type="text"
                        placeholder="First Name"
                        onChange={e => setFormFirstName(e.target.value)}
                    >
                    </input>
                </label>
                <br />
                <label>Last Name:
                    <input type="text"
                    required
                        value={formLastName}
                        placeholder="Last Name"
                        onChange={e => setFormLastName(e.target.value)} />
                </label>
                <br />
                <label> Email:
                     <input
                     required
                        type="email"
                        value={formEmail}
                        placeholder="E-mail"
                        onChange={e => setFormEmail(e.target.value)} />
                </label>
                <br />
                <label> New Password:
                     <input type="password"
                        placeholder="New password"
                        value={formPassword}
                        onChange={e => setFormPassword(e.target.value)} />
                </label>
                <br />
                <label>  Confirm New Password:
                     <input type="password"
                        vale={formConfirmPassword}
                        placeholder="Confirm New Password"
                        onChange={e => setFormConfirmPassword(e.target.value)} />
                </label>
                <br />

                <input type="submit" value="Save Profile" />
                {errors.includes("Nothing was modified!") ? <p style={{color:"red",}}>No changes found</p> : null}
                {errors.includes("Password do not match!") ? <p style={{color:"red"}}>Password do not match!</p> : null}
                {errors.includes("New Password must be at least 8 characters long!") ? <p style={{color:"red"}}>New Password must be at least 8 characters long!</p> : null}
            </form>

            {confirmPassword ?
                <div className="confirm-password">
                    <form onSubmit={handleUpdate}>
                        <p>Enter your password to save updates</p>
                        <input
                            type="password"
                            placeholder="Current Password"
                            value={currentPassword}
                            onChange={e => setCurrentPassword(e.target.value)}></input>
                        <div className="confirm_btns">
                            <input type="submit" value="Proceed"></input>
                            <input onClick={() => toggleConfirmPassword(false)} type="button" value="Cancel"></input>
                        </div>
                        {errors.includes("Password is Incorrect!") ? <p style={{color:"red", background:"none"}}>Password is incorrect</p> : null}
                    </form>
                </div> : null}
                {updated ? 
                <div className="confirm-password">
                 <div className="success" style={{border:"1px solid black"}}>
                     Update Successful!
                     <br/> 
                     You are being redirect to your profile page!
                     <br/>
                     <LoadingSpinner color="#643434"/>
                     </div>    
                </div>    
                :
                null
            }
        </div>

    )
}

export default Settings;