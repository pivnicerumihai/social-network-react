const INITIAL_STATE = {
    loading: false,
    personsList: [],
    error: ""
}

const searchPeople = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SEARCH_PEOPLE_REQUEST":
            return {
                loading: true,
                    ...state
            }
        case "SEARCH_PEOPLE_SUCCESS":
            return{
            loading:false,
            personsList:action.payload,
            error:""
        }
        case "SEARCH_PEOPLE_FAILURE":
            return{
                loading:false,
                personsList:[],
                error:action.payload
            }
        default:
            return state;
    }

}
export default searchPeople;