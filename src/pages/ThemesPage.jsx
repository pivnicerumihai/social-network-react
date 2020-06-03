import React, { useState, Fragment } from "react";
import Theme from "../components/Theme/Theme";
import themesData from "../Themes.json";
import { updateUser } from "../redux/actions/login.action"
import { post } from "../redux/actions/post.action";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { useHistory } from "react-router-dom";
import CreateTheme from "../components/CreateTheme/CreateTheme";
import CustomTheme from "../components/CustomTheme/CustomTheme";
import PreviewThemeBox from "../components/PreviewThemeBox/PreviewThemeBox";
const ThemesPage = () => {
    const user_id = useSelector(state => state.login.userDetails._id);
    const customThemes = useSelector(state => state.login.userDetails.customThemes);
    const dispatch = useDispatch();
    const history = useHistory();
    const [preview, setPreview] = useState(null);
    const [theme, setTheme] = useState(null);
    const [updated, setUpdated] = useState(false)
    const [themeName, setThemeName] = useState("");
    const [showCustomThemes, setShowCustomThemes] = useState(false);
    const [customThemeColors, setCustomThemeColors] = useState({});
    const [popup, setPopup] = useState(false);
    const [newTheme, setNewTheme] = useState([

        getComputedStyle(document.body, null).getPropertyValue(`--primary-color`),
        getComputedStyle(document.body, null).getPropertyValue(`--secondary-color`),
        getComputedStyle(document.body, null).getPropertyValue(`--third-color`),
        getComputedStyle(document.body, null).getPropertyValue(`--shadow`),
        getComputedStyle(document.body, null).getPropertyValue(`--hover-color`),
    ]);

    const primarySchemes = [
        {
            color_name: "primary-color",
            property_name: "Primary Color"
        },
        {
            color_name: "secondary-color",
            property_name: "Secondary Color"
        },
        {
            color_name: "third-color",
            property_name: "Third Color"
        }
        ,
        {
            color_name: "shadow",
            property_name: "Shadow Color"
        },
        {
            color_name: "hover-color",
            property_name: "Hover Color"
        }]
    const handleApplyTheme = (e) => {
        e.preventDefault();
        {
            dispatch(post("http://localhost:3001/user/updateCustomTheme", { newTheme, themeName, user_id }))
                .then(() => dispatch(post("http://localhost:3001/user/updateTheme", { theme: themeName, user_id })))
                .then((res) => {
                    if (res.status === 200) {
                        setUpdated(true);
                        dispatch(updateUser(user_id))
                        setTimeout(() => history.push("/"), 2000)
                    }
                })
        }

    }

    return (
        updated ?
            <div style={{ textAlign: "center", width: "100%", height: "100%", marginTop: "20%", fontSize: "18px" }}>
                Update Successful!
             <br />
             You are being redirect to your profile page!
             <br />
                <LoadingSpinner color="#643434" />
            </div>


            :

            <div className="theme_page">
                <div className="theme_container">
                    <div className="theme_container_title">
                        <h2 >Theme Settings</h2>
                        <h5>Choose from on of the themes below or create one</h5>
                    </div>
                    <div className="theme_boxes">
                        <div className="theme_options">
                            {customThemes.length > 0 ?
                                <div className="custom_themes"
                                    onMouseEnter={() => setShowCustomThemes(true)}
                                    onMouseLeave={() => setShowCustomThemes(false)} >
                                    Custom Themes      &rarr;
                                {showCustomThemes ?
                                        <div className="custom_themes_dropdown">
                                            {customThemes.map((el, i) => {
                                                return <CustomTheme key={i} click={() => {
                                                    setCustomThemeColors(el.properties)
                                                    setPreview("preview_custom_theme")
                                                    setTheme(el.name)
                                                }}>{el.name}</CustomTheme>
                                            })}
                                        </div>
                                        : null}


                                </div> : null}
                            {themesData.map((el, i) => {
                                return <Theme key={i} click={() => {
                                    setPreview(el.preview)
                                    setTheme(el.themeName)
                                }}
                                    themeName={el.themeName} />
                            })}
                            <div onClick={() => setPreview("create_theme")} className="create-theme box">
                                Create your own theme
                    </div>
                        </div>


                        <div className="theme-preview">

                            {preview === null ?
                                <Fragment>
                                    <p className="preview_theme">How to change theme</p>
                                    <p className="theme_instruction">
                                        To change the theme of the website<br />
                                You can either use one of the premade themes<br />
                                by clicking one of theme names on the left side <br />
                                and then clicking the Apply button<br />
                                or you can create your own theme<br />
                                by clicking the Create your own theme <br />

                                    </p>
                                </Fragment>
                                :
                                preview === "create_theme" ?
                                    <Fragment>
                                        <div className="create_theme_title">Create Theme</div>
                                        <div className="create_theme_container">

                                            {primarySchemes.map((el, i) => {
                                                return <CreateTheme key={i} color={el.color_name} name={el.property_name}
                                                    click={(newColor) => {
                                                        setNewTheme(newTheme => [...newTheme], newTheme.splice(i, 1, newColor))
                                                    }} />
                                            })}
                                        </div>
                                        <form onSubmit={handleApplyTheme}>
                                            <input type="text"
                                                value={themeName}
                                                onChange={e => setThemeName(e.target.value)}
                                                placeholder="Enter Theme Name Here"
                                                required
                                                style={{
                                                    outline: "none",
                                                    textAlign: "center",
                                                    border: "1px solid var(--primary-color)",
                                                    borderRadius: "7px"
                                                }}
                                            />
                                            <br />
                                            <br />
                                            <input className="apply_theme_btn" type="submit" value="Apply Theme"></input>                                 </form>
                                    </Fragment>
                                    :
                                    preview === "preview_custom_theme" ?
                                        <Fragment>
                                            <div className="create_theme_title">Preview Custom Theme</div>
                                            <PreviewThemeBox colors={customThemeColors} />
                                            <br />
                                            <button className="apply_custom_theme"
                                                onClick={() => {
                                                    dispatch(post("http://localhost:3001/user/updateTheme", { theme, user_id }))
                                                        .then((res) => {
                                                            if (res.status === 200) {
                                                                setUpdated(true);
                                                                setTimeout(() => history.push("/"), 2000)
                                                            }
                                                        })
                                                }}
                                            >
                                                Use theme
                                            </button>
                                            <button className="delete_custom_theme"
                                                onClick={
                                                    () => {
                                                        setPopup(true);

                                                    }
                                                }>
                                                Delete Theme
                                            </button>
                                        </Fragment>

                                        :
                                        <Fragment>
                                            <p className="preview_theme">Preview Theme</p>
                                            <p className="preview_tips">Click on Apply to start using the theme below</p>
                                            <img src={preview} />
                                            <br />
                                            <button
                                                className="apply_theme_btn"
                                                onClick={() => {
                                                    dispatch(post("http://localhost:3001/user/updateTheme", { theme, user_id }))
                                                        .then((res) => {
                                                            if (res.status === 200) {
                                                                setUpdated(true);
                                                                dispatch(updateUser(user_id))
                                                                setTimeout(() => history.push("/"), 2000)
                                                            }
                                                        })
                                                }
                                                }>
                                                Apply Theme</button>
                                        </Fragment>
                            }

                        </div>
                    </div>
                </div>
                {popup ? <div className="pop-up">
                    <div className="pop-up-text"><p>Are you sure you want to remove the theme</p>
                        <br />
                        <button onClick={() => {
                            dispatch(post("http://localhost:3001/user/deleteCustomTheme", { theme, user_id }))
                                .then((res) => {
                                    if (res.status === 200) {
                                        dispatch(updateUser(user_id))
                                        setPreview(null)
                                        setPopup(false);
                                    }
                                })
                        }}>Yes</button><button onClick={() => { setPopup(false) }}>No</button>
                    </div>
                </div> : null}
            </div>

    )
}

export default ThemesPage;