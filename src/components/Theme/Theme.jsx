import React from "react";

const Theme = (props) => {
    const {themeName, click} = props
    return(
        <div onClick={click}className="box">
            {themeName}
        </div>
    )
}

export default Theme;