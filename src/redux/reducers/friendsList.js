const INITIAL_STATE = {
    name:[],
    profile_pic:[],
    showComponent:false,
    showInputText:false
}

const friendsListReducer = (state = INITIAL_STATE,action) => {
    switch(action.type){
        case "GET_LIST":
            return {name:action.payload.name,profile_pic:action.payload.profile_pic,showComponent:true,showInputText:true};
        case "CLOSE_LIST":
            return {showComponent:false,showInputText:false}
         default:
            return state;
    }
}

export default friendsListReducer;