import { useState } from "react";
import React from "react";
import { useDispatch } from "react-redux";
import { getNameDogs } from "../../Redux/Actions/actions";

import "./SearchBar.css"



export default function SearchBar (){

    const dispatch = useDispatch()

    const [name,setName] =useState("");

    const handleOnChange = (event) => {
        event.preventDefault();
        setName(event.target.value)

    }

    const handleSubmit = (event)=> {
        event.preventDefault();
        dispatch(getNameDogs(name))

    }

    return (
        <div className="searchingArea">
            <input className = "searchBar" type="text" placeholder="Search by breed..." value = {name} onChange={(event)=>handleOnChange(event)}></input>
            <span class="material-icons-outlined"  onClick = {(event) => {handleSubmit(event); setName("")}}>search</span>
            
            {/* <button type="submit"  onClick = {(event) => {handleSubmit(event); setName("")}}className ="searchButton">GO!</button> */}
        </div>
    )
}