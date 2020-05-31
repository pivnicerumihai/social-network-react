import React, { useState, Fragment } from "react";
import Theme from "../components/Theme/Theme";
import themesData from "../Themes.json";
const ThemesPage = () => {

  const [preview,setPreview] = useState(null);
  const [theme,setTheme] = useState(null);
    // ("#4267B2","#898F9C","#e5e5e5","#181b29","white") -color_1
    //    
    const changeTheme = (primary_color, hover_color, secondary_color, shadow_color, font_color,font_color2) => {
        document.body.style.setProperty("--primary-color", primary_color);
        document.body.style.setProperty("--hover-color", hover_color);
        document.body.style.setProperty("--secondary-color", secondary_color);
        document.body.style.setProperty("--shadow", shadow_color);
        document.body.style.setProperty("--font-color-1", font_color);
        document.body.style.setProperty("--font-color-2", font_color2);
         
    }
    console.log(preview);
    return (
        <div className="theme_page">
            <div className="theme_container">
                <div className="theme_container_title">
                    <h2 >Theme Settings</h2>
                    <h5>Choose from on of the themes below or create one</h5>
                </div>
                <div className="theme_boxes">
                    <div className="theme_options">
                       {themesData.map((el,i)=>{
                           return <Theme click={()=>
                            {
                                setPreview(el.preview)
                                setTheme(el.themeName)
                            }}
                            themeName={el.themeName}/>
                       })}
                       <div className= "create-theme box">
                       Create your own theme
                    </div>
                    </div>
                    
                      
                    <div className="theme-preview">
                     
                        {preview === null ? 
                            <Fragment>
                            <p className="preview_theme">How to change theme</p>
                            <p className="theme_instruction">
                                To change the theme of the website<br/>
                                You can either use one of the premade themes<br/>
                                by clicking one of theme names on the left side <br/>
                                and then clicking the Apply button<br/>
                                or you can create your own theme<br/>
                                by clicking the Create your own theme <br/>

                            </p>
                            </Fragment>
                        :
                        <Fragment>
                        <p className="preview_theme">Preview Theme</p>
                        <p className="preview_tips">Click on Apply to start using the theme below</p>
                        <img src={preview} />
                        <br/>
                        <button 
                        className="apply_theme_btn"
                        onClick={() => {
                            if(theme==="Blue"){
                            changeTheme("#4267B2", "#898F9C", "#e5e5e5", "#181b29", "white","black")
                        }
                            else if(theme === "Classic"){
                                changeTheme("#643434","#745252","#e5e5e5","#291818","white","white")
                            }
                            else if( theme === "Dark" ){
                                changeTheme("#3a3b3c","black","#797b7c","hsl(0, 7%, 13%)","white","black","#bdec5")
                            }
                            else if (theme === "Light"){
                                changeTheme("#5B7553","#8EB897","#C3E8BD","rgb(19, 49, 10)","white","rgb(66, 83, 60)","#bdbec5")
                            }
                        
                        }
                       }>
                            Apply Theme</button>
                        </Fragment>
                        }
                       
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ThemesPage;