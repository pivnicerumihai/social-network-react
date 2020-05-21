import axios from "axios"

const searchPeopleRequest = () =>{
    return{
        type:"SEARCH_PEOPLE_REQUEST"
    }
}

const searchPeopleSuccess = (personsList) => {
    return{
        type:"SEARCH_PEOPLE_SUCCESS",
        payload:personsList
    }
}

const searchPeopleFailure = (error) => {
    return{
        type:"SEARCH_PEOPLE_FAILURE",
        payload:error
    }
}

export const searchPeople = (searchString) => {
    return async dispatch =>{
        dispatch(searchPeopleRequest);
        try{
            const res = await axios.get(`http://localhost:3001/searchPeople?searchString=${searchString.toLowerCase()}`);
            console.log("DATA-RESPONSE:",res.data)
            dispatch(searchPeopleSuccess(res.data));
            return res;
        }
        catch(error){
            const errorMessage = error.message;
            dispatch(searchPeopleFailure(error))
            return errorMessage;

        }
    }
}