import React, { useState } from "react";
import axios from "axios"



const RegistrationForm = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [email2, setEmail2] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [error, setError] = useState([]);
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError([]);
        if (email !== email2) {
            setError(errors => [...errors, "Emails do not match!"]);
        }
        else if (password !== password2) {
            setError(errors => [...errors, "Passwords do no match!"]);
        }
        else if (password.length < 8 || password.length > 30) {
            setError(errors => [...errors, "Password must be between 8 and 30 characters long!"]);
        }
        else if (error.length === 0) {


            const user = {
                first_name: firstName,
                last_name: lastName,
                reg_email: email,
                reg_password: password
            }
            axios.post("http://localhost:3001/user/createUser", user)
                .then((res) => {
                    if (res.data === "Email already in use") {
                        setError(errors => [...errors, "Email already in use"])

                    }
                    else if (res.data === "User registered") {
                        console.log(res.data);
                        setFirstName("");
                        setLastName("");
                        setEmail("");
                        setEmail2("");
                        setPassword("");
                        setPassword2("");
                        setError([]);
                        setSuccess(true);
                    }
                    else{
                        console.log(res);
                    }
                }
                )
                .catch((err) => console.log(err))

        }
    }
    return (
        <form className='register_form' onSubmit={handleSubmit}>
            <input type="text" name="first_name" placeholder="Your First Name" value={firstName} required
                onChange={e => setFirstName(e.target.value)} />
            <br />
            <input type="text" name="last_name" placeholder="Your Last Name" value={lastName} required
                onChange={e => setLastName(e.target.value)} />
            <br />
            <input type="email" name="reg_email" placeholder="E-mail Address" value={email} required
                onChange={e => setEmail(e.target.value)} />
            <br />
            <input type="email" name="reg_email2" placeholder="Confirm E-mail Address" value={email2} required
                onChange={e => setEmail2(e.target.value)} />
            <br />
            {error.includes("Emails do not match!") ? <p style={{ color: "red" }}>Emails do no match!</p> : null}
            {error.includes("Email already in use") ? <p style={{ color: "red" }}>Email is already in use!</p> : null}
            <input type="password" name="reg_password" placeholder="Password" value={password} required
                onChange={e => setPassword(e.target.value)} />
            <br />
            <input type="password" name="reg_password2" placeholder="Confirm Password" value={password2} required
                onChange={e => setPassword2(e.target.value)} />
            <br />
            {error.includes("Passwords do no match!") ? <p style={{ color: "red" }}>Passwords do no match!</p> : null}
            {error.includes("Password must be between 8 and 30 characters long!") ? <p style={{ color: "red" }}>Password must be between 8 and 30 characters long!</p> : null}
            <input type="submit" value="Register" />
            {success ? <p>You have succesfully registered! You can now log in!</p> : null}
        </form>

    )
}

export default RegistrationForm;