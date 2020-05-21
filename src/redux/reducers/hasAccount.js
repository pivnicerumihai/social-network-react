

const hasAccountReducer  = (state = true, action)=>{
    switch(action.type){
        case 'REGISTER':   
            return !state;
        default:
            return state;
    }
}

export default hasAccountReducer;