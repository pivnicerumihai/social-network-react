const INITIAL_STATE = {
    loading:false,
   friendsList:[],
    error: "",
    showComponent:false,
    showInputText:false
}

 const getFriendsListReducer = (state = INITIAL_STATE,action) =>{
     switch(action.type){
         case "GET_FRIENDS_LIST_REQUEST":
             return {
                 ...state,
                 loading:true,

             }
         case "GET_FRIENDS_LIST_SUCCESS":
             return{
                ...state,
                 loading:false,
                 friendsList:action.payload,
                 error:"",

             }
         case "GET_FRIENDS_LIST_FAILURE":
             return{
                 
                 loading:false,
                 friendsList:[],
                 error:action.payload,
                 showComponent:false,
                 showInputText:false
             }
         case "TOGGLE_LIST":
             return{
                 ...state,
                 showComponent:!state.showComponent,
                 showInputText:!state.showInputText
             }
        default:return state;
     }
 }
 export default getFriendsListReducer;