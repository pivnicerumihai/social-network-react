import React,{useState} from "react";
import { useHistory } from "react-router-dom";
import FriendRequestsDropdown from "./FriendRequestsDropdown/FriendRequestsDropdown";
import SearchBar from "./SearchBar/SearchBar";
import SettingsDropdown from "./SettingsDropdown/SettingsDropdown";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSlidersH, faHome, faSignOutAlt, faUsers } from '@fortawesome/free-solid-svg-icons'

import { useDispatch, useSelector } from "react-redux";

function Navbar(props) {
    const history = useHistory();
    let friend_requests = useSelector(state => state.login.userDetails.friend_requests);
    
    const [friendRequests,toggleFriendRequests] = useState(false);
    const [settings,toggleSettings] = useState(false);

    return (
        <nav className="navbar">
            <Link  style={{textDecoration:"none"}}to="/">
            <button className="logo">Codefeed</button>
            </Link>
            <SearchBar/>
            <span className="icons">
            <Link to="/"><button> <FontAwesomeIcon icon={faHome} size="2x" /></button></Link>
                <button 
                onClick={()=>
                    {toggleFriendRequests(!friendRequests);
                     toggleSettings(false)
                }}><FontAwesomeIcon icon={faUsers} size="2x" />
                {friend_requests ?  <p className="notifications">{friend_requests.length}</p> : null } </button>
                {friendRequests && friend_requests.length > 0 ? <div className= "friend_requests_list"><h4>Friend Requests</h4>
                    {friend_requests.map((el,i)=>{return ( <FriendRequestsDropdown key={i} friend_id={el.id} profile_pic = {el.profile_pic} name={el.name} />)})}
                </div> 
                :  friendRequests && friend_requests.length === 0 ?
                <div style={{borderBottomRightRadius:"15px",borderBottomLeftRadius:"15px"}}className= "friend_requests_list">
                    <h4>Friend Requests</h4>
                <p style={{textAlign:"center",color:"rgb(159, 159, 159)",marginTop:"25px"}}>You have no Friend Requests!</p>
                </div>
               :
                null}
          
                <button onClick={()=>{
                    toggleSettings(!settings);
                    toggleFriendRequests(false)}}><FontAwesomeIcon icon={faSlidersH} size="2x" /></button>
                {settings ? <SettingsDropdown/> : null}
            </span>
        </nav>
    )
}

export default Navbar;