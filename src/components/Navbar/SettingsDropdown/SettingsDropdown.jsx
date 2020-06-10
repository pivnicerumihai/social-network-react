import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../../redux/actions/login.action";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'


const SettingsDropdown = (props) => {

    const history = useHistory();
    const dispatch = useDispatch();
    return (
        <div className="settings_dropdown" >
            <h4>Settings</h4>
            <div className="settings" >
                <Link to="/" onClick={props.click}>Home</Link>
                <Link to="/user/settings" onClick={props.click}>Accounts Details</Link>
                <Link className="theme_link" to="/user/theme" onClick={props.click}>Theme Settings</Link>
                <button onClick={() => {
                    dispatch(logout())
                    history.push("/")
                }}>Log Out</button>
            </div>
        </div>
    )
}

export default SettingsDropdown;