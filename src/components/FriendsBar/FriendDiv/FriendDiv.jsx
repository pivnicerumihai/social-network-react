import React from "react";
import {Link} from "react-router-dom";

function FriendDiv(props){

    const { name, img, id} = props;

    return(
        <div className="friend-div">
            <Link to={id}>            
            <img src={img} alt="profile picture not loaded"/>
            <br/>
            <p>{name}</p>
            </Link>

        </div>
    )
}

export default FriendDiv;