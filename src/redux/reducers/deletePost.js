const deletePostReducer = (state = {loading:false,success:null,error:""}, action) =>{
    switch(action.type){
        case "DELETE_POST_REQUEST":{
            return{
                success:null,
                loading:true
            }
        }
        case "DELETE_POST_SUCCESS":{
            return {
                success:true,
                loading:false
            }
        }
        case "DELETE_POST_FAILURE":{
            return{
                success:false,
                loading:false,
                error:action.payload
            }
        }
        default:
            return{
                loading:false,
                success:null,
                error:""
            }
    }

    
}

export default deletePostReducer;