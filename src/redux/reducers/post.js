const postReducer = (state = {loading:false,success:null,error:""},action)=>{
    switch(action.type){
        case "POST_REQUEST":{
            return {
                ...state,loading:true
            }
        }
        case "POST_SUCCESS":{
            return{
                loading:false,
                success:true
            }
        }
        case "POST_FAILURE":{
            return{
                loading:false,
                success:false,
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
export default postReducer;