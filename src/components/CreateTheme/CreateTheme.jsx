import React, { Fragment, useState } from "react";
import { SketchPicker } from "react-color";
import SaveButton from "./SaveButton/SaveButton";

const CreateTheme = (props) => {
    const { color, name, click } = props;
    let [newColor, setNewColor] = useState(getComputedStyle(document.body, null).getPropertyValue(`--${color}`))
    let [picker, togglePicker] = useState(false);
    return (
        <div className="theme_color">
            {picker ?
 
                    <SketchPicker
                        color={newColor}
                        onChange={(selected_color) => {
                            setNewColor(selected_color.hex);
                            document.body.style.setProperty(`--${color}`, newColor)
                        }}
                    />
                :
                null}

<br/>
            <div className="colour-box"
                style={{ backgroundColor: getComputedStyle(document.body, null).getPropertyValue(`--${color}`) }}
                onClick={() => { togglePicker(!picker) }}
            > </div>
         <p>{name}</p>
        <SaveButton click={click} color={newColor}/>
        </div>
    )
}

export default CreateTheme;