import React,{useEffect} from 'react';
import SignUpSignIn from "./pages/SignUpSignIn";
import ProfilePage from "./pages/ProfilePage";
import FriendPage from "./pages/FriendPage";
import Settings from "./pages/Settings";
import ThemesPage from "./pages/ThemesPage";
import Navbar from "./components/Navbar/Navbar";
import Background from "./assets/images/LaptopBackground.jpg";
import { BrowserRouter as Router, Route} from "react-router-dom";
import {useSelector} from "react-redux";

function App(){

  let isLogged = useSelector(state=>state.login.isLogged);
  const {theme, customThemes} = useSelector(state=>state.login.userDetails);

  const changeTheme = (primary_color, hover_color, secondary_color, shadow_color, font_color, font_color2) => {
    document.body.style.setProperty("--primary-color", primary_color);
    document.body.style.setProperty("--hover-color", hover_color);
    document.body.style.setProperty("--secondary-color", secondary_color);
    document.body.style.setProperty("--shadow", shadow_color);
    document.body.style.setProperty("--font-color-1", font_color);
    document.body.style.setProperty("--font-color-2", font_color2);

}

  useEffect(() => {
    if(isLogged){
    if (theme === "Blue") {
      changeTheme("#4267B2", "#898F9C", "#e5e5e5", "#181b29", "white", "black")
  }
  else if (theme === "Classic") {
      changeTheme("#643434", "#745252", "#e5e5e5", "#291818", "white", "white")
  }
  else if (theme === "Dark") {
      changeTheme("#3a3b3c", "black", "#797b7c", "hsl(0, 7%, 13%)", "white", "black", "#bdec5")
  }
  else if (theme === "Light") {
      changeTheme("#5B7553", "#8EB897", "#C3E8BD", "rgb(19, 49, 10)", "white", "rgb(66, 83, 60)", "#bdbec5")
  }
  else{
    customThemes.forEach(el=>{
      if(Object.values(el)[0] === theme){
        const { primary_color,secondary_color,hover_color,third_color,shadow} = Object.values(el)[1];
        changeTheme(primary_color,hover_color,secondary_color,shadow,"white",third_color)
      }
    })
  }
}
else{
  changeTheme("#643434", "#745252", "#e5e5e5", "#291818", "white", "white")
}
  }, [theme,customThemes,isLogged]);

    if(isLogged){
      return(
        
      <Router>
        <Navbar/>
        <Route exact path="/" component={ProfilePage}/>
        <Route exact path="/:friend_id" component={FriendPage}/>
        <Route path="/user/settings" component={Settings}/>
        <Route path="/user/theme" component={ThemesPage}/>
      </Router>
      )
    }
    else{
      return(
        
      <div className={"first_page "} style={{backgroundImage:`url(${Background})`}} >
        <SignUpSignIn/>
      </div>
    )
    }
}

export default App;
