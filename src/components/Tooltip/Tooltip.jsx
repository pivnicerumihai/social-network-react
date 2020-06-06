import React from "react";

const Tooltip = (props) => {

    return (
        <div className="tooltip">
            {props.posted_to.map((el, i) => {
                if (i > 2) {
                    return <p>{el}</p>
                }
            })}
        </div>
    )
}

export default Tooltip;