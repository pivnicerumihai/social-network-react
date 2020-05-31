const INITIAL_STATE = "primary";

const themeReducer = ( state = INITIAL_STATE, action) =>{
    switch(action.type){
        case "PRIMARY":
                return "primary"
                
        case "SECONDARY":
            return  "secondary"
        default :
        return state
        
    }
}

export default themeReducer;