import React from "react";

const Tooltip = (props) => {

    return (
        <div className="tooltip">
            {props.posted_to.map((el, i) => {
                if (i > 2) {
                    return <p>{el.name}</p>
                }
                else {
                    return null;
                }
            })}
        </div>
    )
}

export default Tooltip;