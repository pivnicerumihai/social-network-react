import React,{useState} from "react";
import { useHistory } from "react-router-dom";
import FriendRequestsDropdown from "./FriendRequestsDropdown/FriendRequestsDropdown";
import SearchBar from "./SearchBar/SearchBar";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSlidersH, faHome, faSignOutAlt, faUsers } from '@fortawesome/free-solid-svg-icons'
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
            <Link to="/"><button> <FontAwesomeIcon icon={faHome} size="2x" /></button></Link>
                <button onClick={()=>setDropdown(!dropdown)}><FontAwesomeIcon icon={faUsers} size="2x" />
                {friend_requests ?  <p className="notifications">{friend_requests.length}</p> : null } </button>
                {dropdown && friend_requests.length > 0 ? <div className= "friend_requests_list"><h4>Friend Requests</h4>
                    {friend_requests.map((el,i)=>{return ( <FriendRequestsDropdown key={i} friend_id={el.id} profile_pic = {el.profile_pic} name={el.name} />)})}
                </div> 
                : dropdown && friend_requests.length === 0 ?
                <div style={{borderBottomRightRadius:"15px",borderBottomLeftRadius:"15px"}}className= "friend_requests_list">
                    <h4>Friend Requests</h4>
                <p style={{textAlign:"center",color:"rgb(159, 159, 159)",marginTop:"25px"}}>You have no Friend Requests!</p>
                </div>
               :
                null}
          
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