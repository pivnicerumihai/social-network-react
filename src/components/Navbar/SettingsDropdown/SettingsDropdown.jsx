import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../../redux/actions/login.action";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

const SettingsDropdown = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    return (
        <div className="settings_dropdown">
            <h4>Settings</h4>
            <div className="settings">
                <Link to="/user/settings">Accounts Details</Link>
                <Link to="/user/theme">Theme Settings</Link>
                <button onClick={() => {
                    dispatch(logout())
                    history.push("/")
                }}>Log Out</button>
            </div>
        </div>
    )
}

export default SettingsDropdown;