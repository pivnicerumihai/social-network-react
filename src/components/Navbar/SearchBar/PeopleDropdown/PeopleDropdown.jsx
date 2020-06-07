import React from "react";
import { Link } from "react-router-dom";

const PeopleDropdown = (props) => {

    const { user_id, profile_pic, name} = props;

    return(
        <Link style={{textDecoration:"none"}} to={user_id}>
        <div onClick={props.mouseClick} className="people">
            <img src={profile_pic} alt="user_pic"></img>
            <p>{name}</p>
        </div>
        </Link>
    )

}

export default PeopleDropdown;