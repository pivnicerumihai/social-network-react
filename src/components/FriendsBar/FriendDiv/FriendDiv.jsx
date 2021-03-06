import React from "react";
import {Link} from "react-router-dom";

function FriendDiv(props){

    const { name, img, id} = props;

    return(
    
            <Link className="friend-div" to={id}>            
            <img src={img} alt="user_pic"/>
            <p>{name}</p>
            </Link>

    )
}

export default FriendDiv;