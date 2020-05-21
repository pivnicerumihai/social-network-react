import React,{Component} from "react";
import axios from "axios"


class RegistrationForm extends Component
{
    constructor(props){
    super(props)
    
   

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state={
       
        first_name:"",
        last_name:"",
        reg_email:'',
        reg_email2:``,
        reg_password:``,
        reg_password2:``,
        passwordError:``,
        emailDoNotMatch:``,
        success:false,
    }
}
    handleChange(e){
        this.setState({[e.target.name] : e.target.value});
        if(e.target.name === "reg_email" || e.target.name === "reg_email2"){
        this.setState({emailDoNotMatch:""})
        }
        if(e.target.name === "reg_password" || e.target.name === "reg_password2"){
        this.setState({passwordError:""})
        }
        
    }

 

    handleSubmit(e){
        e.preventDefault();
        if(this.state.reg_email !== this.state.reg_email2){
            this.setState({emailDoNotMatch:"Emails do not match!"});
        }    
        else if(this.state.reg_password !== this.state.reg_password2){
            this.setState({passwordError:"Passwords do no match!"});
        }
        else if(this.state.reg_password.length < 8 || this.state.reg_password.length > 30){
            this.setState({passwordError:"Password must be between 8 and 30 characters long!"});
        }
        else if(this.state.emailDoNotMatch !=="Emails do not match!" && this.state.passwordError === ""){
            const { first_name, last_name, reg_email, reg_password } =  this.state;
            const user ={
                first_name:first_name,
                last_name:last_name,
                reg_email:reg_email,
                reg_password:reg_password
            }
            axios.post("http://localhost:3001/createUser", user)
            .then((res)=>{if(res.data === "Email already in use"){
                this.setState({emailDoNotMatch:"Email already in use"})
            
            }})
            .then(()=>{
                if(this.state.emailDoNotMatch === "" && this.state.passwordError === ""){
                    this.setState({success:true})
                }
            })
            .then(()=>{
                this.setState({first_name:"",
                last_name:"",
                reg_email:'',
                reg_email2:``,
                reg_password:``,
                reg_password2:``,
                passwordError:``,
                emailDoNotMatch:``,
               })
            })
            .catch((err)=>console.log(err))
            

        }
    
       
    }
    
    render(){
       
    return(
        <form className='register_form' onSubmit={this.handleSubmit}>
            <input type="text" name="first_name" placeholder="Your First Name" value={this.state.first_name} required onChange={this.handleChange}/>
            <br/>
            <input type="text" name="last_name" placeholder="Your Last Name"  value={this.state.last_name} required onChange={this.handleChange}/>
            <br/>
            <input type="email" name="reg_email" placeholder="E-mail Address" value={this.state.reg_email} required onChange={this.handleChange}/>
            <br/>
            <input type="email" name="reg_email2" placeholder="Confirm E-mail Address" value={this.state.reg_email2} required onChange={this.handleChange}/>
            <br/>
            {this.state.emailDoNotMatch === "Emails do not match!" ? <p style={{color:"red"}}>Emails do no match!</p> : null}
            {this.state.emailDoNotMatch === "Email already in use" ? <p style={{color:"red"}}>Email is already in use!</p> : null}
            <input type="password" name="reg_password" placeholder="Password" value={this.state.reg_password} required onChange={this.handleChange}/>
            <br/>
            <input type="password" name="reg_password2" placeholder="Confirm Password" value={this.state.reg_password2} required onChange={this.handleChange} />
            <br/>
            {this.state.passwordError === "Passwords do no match!" ? <p style={{color:"red"}}>Passwords do no match!</p> : null}
            {this.state.passwordError === "Password must be between 8 and 30 characters long!" ? <p style={{color:"red"}}>Password must be between 8 and 30 characters long!</p> : null}
            <input type="submit" value="Register"/>
            {this.state.success ? <p>You have succesfully registered! You can now log in!</p> : null}
        </form>

    )

    }

}

export default RegistrationForm;