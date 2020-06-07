import React, { useState,useEffect } from "react";
import PeopleDropdown from "./PeopleDropdown/PeopleDropdown";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import {searchPeople} from "../../../redux/actions/searchPeople.action";
import {useSelector, useDispatch} from "react-redux";
import { union } from "lodash";

const SearchBar = () => {
    const peopleList = useSelector(state=>state.searchPeople.personsList);
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState("");
    const [dropdown, setDropdown] = useState(false);
    const loading = useSelector(state=>state.searchPeople.loading);

    useEffect(()=>{
        dispatch(searchPeople(inputValue));
    },[inputValue,dispatch])


    return (
        <div className="search-bar">
        <input type="text" 
        placeholder="&#x1F50D; Search People" 
        value={inputValue} 
        onChange={e => { 
            setInputValue(e.target.value); 
            setDropdown(true)}} >
        </input>
        {dropdown?     
        <div className="people-dropdown" onMouseLeave={()=>setDropdown(false)}>
        {peopleList.name && loading === false? union(peopleList.name).map((el,i)=>{
            return <div  key={i}><PeopleDropdown mouseClick={()=>setDropdown(false)}user_id={peopleList.user_id[i]} profile_pic={peopleList.profile_pic[i]} name={el}></PeopleDropdown></div>
        }): <LoadingSpinner/>}</div>:null}
        </div>
    )
}

export default SearchBar;