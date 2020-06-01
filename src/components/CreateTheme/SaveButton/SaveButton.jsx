import React,{useState, Fragment} from "react";

const SaveButton = (props)=>{
    const [saved,setSaved] = useState(false);
    return(
        <Fragment>
        <button 
        className="apply_theme_btn"
        onClick={()=>{setSaved(true);
        props.click(props.color)}}
        >Save</button>
        {saved ? <p>Color Saved</p> :<p><br/></p>}
        </Fragment>
    )
}
export default SaveButton;