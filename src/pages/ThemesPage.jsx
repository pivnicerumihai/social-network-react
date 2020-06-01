import React, { useState, Fragment } from "react";
import Theme from "../components/Theme/Theme";
import themesData from "../Themes.json";
import { updateUser } from "../redux/actions/login.action"
import { post } from "../redux/actions/post.action";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { useHistory } from "react-router-dom";

const ThemesPage = () => {
    const user_id = useSelector(state => state.login.userDetails._id);
    const dispatch = useDispatch();
    const history = useHistory();
    const [preview, setPreview] = useState(null);
    const [theme, setTheme] = useState(null);
    const [updated, setUpdated] = useState(false)

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
                            {themesData.map((el, i) => {
                                return <Theme click={() => {
                                    setPreview(el.preview)
                                    setTheme(el.themeName)
                                }}
                                    themeName={el.themeName} />
                            })}
                            <div className="create-theme box">
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
            </div>

    )
}

export default ThemesPage;