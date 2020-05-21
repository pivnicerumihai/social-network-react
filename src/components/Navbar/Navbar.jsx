import React,{useState} from "react";
import { useHistory } from "react-router-dom";
import FriendRequestsDropdown from "./FriendRequestsDropdown/FriendRequestsDropdown";
import SearchBar from "./SearchBar/SearchBar";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSlidersH, faUserCircle, faSignOutAlt, faInbox } from '@fortawesome/free-solid-svg-icons'
import { logout } from "../../redux/actions/login.action";
import { useDispatch, useSelector } from "react-redux";

function Navbar() {
    const history = useHistory();
    const dispatch = useDispatch();
    let friend_requests = useSelector(state => state.login.userDetails.friend_requests);
    
    const [dropdown,setDropdown] = useState(false);
   

    return (
        <nav className="navbar">
            <Link  style={{textDecoration:"none"}}to="/">
            <button className="logo">Codefeed</button>
            </Link>
            <SearchBar/>
            <span className="icons">
                <button onClick={()=>setDropdown(!dropdown)}><FontAwesomeIcon icon={faInbox} size="2x" />
                {friend_requests ?  <p className="notifications">{friend_requests.length}</p> : null } </button>
                {dropdown && friend_requests ? <div className= "friend_requests_list"><h4>Friend Requests</h4>
                    {friend_requests.map((el,i)=>{return ( <FriendRequestsDropdown key={i} friend_id={el.id} profile_pic = {el.profile_pic} name={el.name} />)})}
                </div> : null}
            
                <Link to="/"><button> <FontAwesomeIcon icon={faUserCircle} size="2x" /></button></Link>
                <button><FontAwesomeIcon icon={faSlidersH} size="2x" /></button>
                <button onClick={() => {
                    dispatch(logout())
                    history.push("/")
                    ;}}><FontAwesomeIcon icon={faSignOutAlt} size="2x" /></button>
            </span>
        </nav>
    )
}

export default Navbar;