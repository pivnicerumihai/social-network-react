import React,{useState} from "react";

function FriendsList(props){

    const [checked,setChecked]=useState(false);
    const {profile_pic, name, click} = props;

    return(
        <div className="friend_details">
            <img src={`${profile_pic}`} alt="Not loaded"></img>
            <p>{name}</p>
            <input type="checkbox" onClick={click} checked={checked} onChange={()=>setChecked(!checked)}/>
        </div>
    )
}

export default FriendsList;