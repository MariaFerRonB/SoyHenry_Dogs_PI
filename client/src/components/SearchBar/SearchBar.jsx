

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNameDogs } from "../../Redux/Actions/actions";
import "./SearchBar.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const [name, setName] = useState("");  //our name state starts as an empty string

  const handleOnChange = (event) => { //onChange we will set out our name to what the user types. 
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const dog = allDogs.filter((dog) =>
      dog.name.toLowerCase().includes(name.toLowerCase())
    );
    if (dog.length > 0) {
      dispatch(getNameDogs(name));
    } else {
      alert("Dog was not found"); // We filter by the "name" the user provides as we want to bring all the matches that include what the user searches for.

    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event); //if the key being pressed is enter then handlesubmit is called.
    }
  };


  return (
    <div className="searchingArea">
      <input
        className="searchBar"
        type="text"
        placeholder="Search by breed..."
        value={name}
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
        autoFocus // Add this attribute
      />
      <span
        className="material-icons-outlined"
        onClick={(event) => {
          handleSubmit(event);
          setName("");
        }}
      >
        search
      </span>
    </div>
  );
}