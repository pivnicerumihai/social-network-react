import React from "react";

const CustomTheme = (props) => {
    
    const {children,click} = props;

    return(
        <p onClick={click}>{children}</p>
    )
}

export default CustomTheme;