export const getList = (friendsList) =>{
    return {
        type:"GET_LIST",
        payload:friendsList
    }
}

export const closeList = () =>{
    return{
    type:"CLOSE_LIST",
    }
}
