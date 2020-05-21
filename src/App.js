import React from 'react';
import SignUpSignIn from "./pages/SignUpSignIn";
import ProfilePage from "./pages/ProfilePage";
import FriendPage from "./pages/FriendPage";
import Navbar from "./components/Navbar/Navbar";
import Background from "./assets/images/LaptopBackground.jpg";
import { BrowserRouter as Router, Route} from "react-router-dom";
import {useSelector} from "react-redux";

function App(){

  let isLogged = useSelector(state=>state.login.isLogged);

    if(isLogged){
      return(
        
      <Router>
        <Navbar />
        <Route exact path="/" component={ProfilePage}/>
        <Route path="/:friend_id" component={FriendPage}/>
      </Router>
      )
    }
    else{
      return(
        
      <div className="first_page" style={{backgroundImage:`url(${Background})`}} >
        <SignUpSignIn/>
      </div>
    )
    }
}

export default App;
