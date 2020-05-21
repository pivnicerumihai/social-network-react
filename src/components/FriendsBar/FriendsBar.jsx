import React,{useEffect} from "react";
import FriendDiv from "./FriendDiv/FriendDiv";
import {getFriendList} from "../../redux/actions/getFriendList.action";

import { useSelector, useDispatch } from "react-redux";

function FriendsBar(props) {
   
    const friendsList = useSelector(state => state.getFriendsList.friendsList);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getFriendList(props.id,""))
    },[])

 
    

    const { name, user_id, profile_pic } = friendsList;
    const loading =useSelector(state=>state.getFriendsList.loading)

    return (
        <div className="friends-bar">
            <h3>Friends</h3>
            {name !== undefined && loading === false? name.map((el, i) => {
                return (<FriendDiv key={i} id={user_id[i]} name={el} img={profile_pic[i]} />)
            }) : null}
        </div>
    )
}

export default FriendsBar;