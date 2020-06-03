import React, { useState, Fragment } from "react";

const SaveButton = (props) => {
    const { click, color, saved, setSaved } = props;
    return (
        <Fragment>
            <button
                className="apply_theme_btn"
                onClick={() => {
                    setSaved();
                   click(color)
                }}
            >Save</button>
            {saved ? <p className="saved">Color Saved</p> : saved === false ? <p className="saved">You must press Save to use this color </p> : null}
        </Fragment>
    )
}
export default SaveButton;