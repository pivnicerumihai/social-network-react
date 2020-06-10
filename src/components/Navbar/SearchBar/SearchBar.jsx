import React, { useState,useEffect } from "react";
import PeopleDropdown from "./PeopleDropdown/PeopleDropdown";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import {searchPeople} from "../../../redux/actions/searchPeople.action";
import {useSelector, useDispatch} from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { union } from "lodash";

const SearchBar = (props) => {
    const peopleList = useSelector(state=>state.searchPeople.personsList);
    const dispatch = useDispatch();
    const [dropdown, setDropdown] = useState(false);
    const loading = useSelector(state=>state.searchPeople.loading);

    return (
        <div className="search-bar">
        <input type="text" 
        placeholder="&#x1F50D; Search People" 
        onChange={e => { 
            setDropdown(true)
            dispatch(searchPeople(e.target.value))}} >
        </input>
      
        {dropdown?     
      
        <div className="people-dropdown" onMouseLeave={()=>setDropdown(false)}>
            {  props.size < 1040 && dropdown ? 
            <div  className="close_results_btn">
            <FontAwesomeIcon icon={faTimes} onClick={()=>{
                setDropdown(false)
                }}></FontAwesomeIcon>
            </div> : null}
        {peopleList.name && loading === false? union(peopleList.name).map((el,i)=>{
            return <div  key={i}><PeopleDropdown mouseClick={()=>setDropdown(false)}user_id={peopleList.user_id[i]} profile_pic={peopleList.profile_pic[i]} name={el}></PeopleDropdown></div>
        }): <LoadingSpinner/>}</div>:null}
        </div>
    )
}

export default SearchBar;