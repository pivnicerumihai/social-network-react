import React, { useState, Fragment } from "react";
import FriendRequestsDropdown from "./FriendRequestsDropdown/FriendRequestsDropdown";
import SearchBar from "./SearchBar/SearchBar";
import SettingsDropdown from "./SettingsDropdown/SettingsDropdown";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSlidersH, faHome, faUsers, faBars, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

import { useSelector } from "react-redux";
import useWindowSize from "../../Custom Hooks/useWindowSize";
function Navbar(props) {

    let friend_requests = useSelector(state => state.login.userDetails.friend_requests);
    const size = useWindowSize();
    const [friendRequests, toggleFriendRequests] = useState(false);
    const [settings, toggleSettings] = useState(false);
    const [mobileRequestNumber, setMobileRequestNumber] = useState(0);

    return (
        <nav className="navbar">
            <Link style={{ textDecoration: "none" }} to="/">
                <button className="logo">Codefeed</button>
            </Link>
            <SearchBar size={size.width} />
            {size.width > 708 ?
                <span className="icons">
                    <Link to="/"><button
                        onClick={() => {
                            toggleFriendRequests(false);
                            toggleSettings(false);

                        }}>
                        <FontAwesomeIcon icon={faHome} size="2x" /></button></Link>
                    <button
                        onClick={() => {
                            toggleFriendRequests(!friendRequests);
                            toggleSettings(false)
                        }}><FontAwesomeIcon icon={faUsers} size="2x" />
                        {friend_requests ? <p className="notifications">{friend_requests.length}</p> : null} </button>
                    {friendRequests && friend_requests.length > 0 ? <div className="friend_requests_list"><h4>Friend Requests</h4>
                        {friend_requests.map((el, i) => { return (<FriendRequestsDropdown key={i} friend_id={el.id} profile_pic={el.profile_pic} name={el.name} />) })}
                    </div>
                        : friendRequests && friend_requests.length === 0 ?
                            <div style={{ borderBottomRightRadius: "15px", borderBottomLeftRadius: "15px" }} className="friend_requests_list">
                                <h4>Friend Requests</h4>
                                <p style={{ textAlign: "center", color: "rgb(159, 159, 159)", marginTop: "25px" }}>You have no Friend Requests!</p>
                            </div>
                            :
                            null}

                    <button onClick={() => {
                        toggleSettings(!settings);
                        toggleFriendRequests(false)
                    }}><FontAwesomeIcon icon={faSlidersH} size="2x" /></button>
                    {settings ? <SettingsDropdown click={() => toggleSettings(false)} /> : null}
                </span>
                :
                <Fragment>
                    <button
                        onClick={() => {
                            toggleFriendRequests(!friendRequests);
                            toggleSettings(false)
                        }}><FontAwesomeIcon style={{ marginTop: "15px" }} icon={faUsers} size="2x" />
                        {friend_requests ? <p className="notifications">{friend_requests.length}</p> : null} </button>
                    <button className="menu_button_res"
                        onClick={() => { toggleSettings(!settings) }}>
                        <FontAwesomeIcon icon={faBars} size="2x" />
                    </button>
                    {friendRequests && friend_requests.length > 0 && size.width < 708
                        ?
                        <div className="friend_requests_list">
                            <h4>Friend Requests</h4>
                            {mobileRequestNumber > 0 ?
                                <FontAwesomeIcon
                                    className="request_arrow_left"
                                    icon={faArrowLeft}
                                    onClick={() =>
                                        setMobileRequestNumber(mobileRequestNumber - 1)
                                    }
                                />
                                :
                                null
                            }
                            <FriendRequestsDropdown key={mobileRequestNumber} friend_id={friend_requests[mobileRequestNumber].id} profile_pic={friend_requests[mobileRequestNumber].profile_pic} name={friend_requests[mobileRequestNumber].name}></FriendRequestsDropdown>
                            {mobileRequestNumber+1 < friend_requests.length ?
                                <FontAwesomeIcon
                                    className="request_arrow_right"
                                    icon={faArrowRight}
                                    onClick={() =>
                                        setMobileRequestNumber(mobileRequestNumber + 1)
                                    }
                                />
                                :
                                null
                            }
                        </div>
                        :
                        friendRequests && friend_requests.length === 0 && size.width < 708 ?
                            <div style={{ borderBottomRightRadius: "15px", borderBottomLeftRadius: "15px" }} className="friend_requests_list">
                                <h4>Friend Requests</h4>
                                <p style={{ textAlign: "center", color: "rgb(159, 159, 159)" }}>You have no Friend Requests!</p>
                            </div>
                            :
                            null}
                </Fragment>

            }


            {settings && size.width <= 708 ?

                <SettingsDropdown
                    toggleFriendRequests={() => {
                        toggleFriendRequests(!friendRequests);
                    }}
                    click={() => toggleSettings(false)} size={size.width} />

                :
                null}

        </nav>
    )
}

export default Navbar;