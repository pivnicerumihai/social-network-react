import React,{useState} from "react";

function FriendsList(props){

    const [checked,setChecked]=useState(false);

    return(
        <div className="friend_details">
            <img src={`${props.profile_pic}`} alt="Not loaded"></img>
            <p>{props.name}</p>
            <input type="checkbox" onClick={props.click} checked={checked} onChange={()=>setChecked(!checked)}/>
        </div>
    )
}

export default FriendsList;