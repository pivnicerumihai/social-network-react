import React, { useEffect } from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import FriendDiv from "./FriendDiv/FriendDiv";
import { getAllFriends } from "../../redux/actions/getAllFriends.action";
import { useSelector, useDispatch } from "react-redux";

function FriendsBar(props) {
    const { id, friend_array,friend_id, friend_name} = props;
    const all_friends = useSelector(state => state.getAllFriends.all_friends);
    const friend_details = useSelector(state => state.getFriendDetails)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllFriends(id))
    }, [id,dispatch])

    const { name, user_id, profile_pic } = all_friends;

 return(
        <div className="friends-bar">
            <h3>Friends</h3>

            {name === undefined ? <LoadingSpinner color="var(--secondary-color)"/> : name.length > 0 ? 
            name.map((el, i) => {
                return (<FriendDiv key={i} id={user_id[i]} name={el} img={profile_pic[i]} />)
            })
            :  
            <p style={{backgroundColor:"var(--secondary-color)",borderRadius:"7px",width:"90%",height:"70%", padding:"15px",textAlign:"center",fontWeight:"600"}}>
                
        {friend_id && !friend_array.includes(friend_id)? `You can't see ${friend_name}'s friends yet!`:`You have no friends! You can add friends by searching for people in the search bar and then sending them a friend request!`
        }</p> }

            
        </div>
 )
}

export default FriendsBar;