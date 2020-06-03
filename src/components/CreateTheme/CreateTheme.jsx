import React, { useState } from "react";
import { SketchPicker } from "react-color";
import SaveButton from "./SaveButton/SaveButton";

const CreateTheme = (props) => {
    const { color, name, click } = props;
    const [newColor, setNewColor] = useState(getComputedStyle(document.body, null).getPropertyValue(`--${color}`))
    const [picker, togglePicker] = useState(false);
    const [saved,setSaved] = useState(null);
    return (
        <div className="theme_color">
            {picker ?
 
                    <SketchPicker
                        color={newColor}
                        onChange={(selected_color) => {
                            setNewColor(selected_color.hex);
                            setSaved(false)
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
        <SaveButton click={click} color={newColor} saved={saved} setSaved={()=>setSaved(true)}/>
        </div>
    )
}

export default CreateTheme;