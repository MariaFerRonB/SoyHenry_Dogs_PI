import React from "react"; 
import {NavLink} from "react-router-dom";
import {useEffect, useState} from "react"; 
import {useDispatch, useSelector} from "react-redux";
import { getDogs, filterByTemperament, filterByCreated, orderByName, getTemperaments, filterByWeight} from "../../Redux/Actions/actions"
import Card from "../Card/Card"
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";
import paw from "./images/paw.png"
import doggie from "./images/doglogo.png"
import arrow from "./images/arrow.png"
import "./Home.css"


export default function Home() {
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs); //we bring all the dogs from our store
    const allTemperaments = useSelector((state) => state.temperaments);// same here for the temperaments
  
    const [currentPage, setCurrentPage] = useState(1); // The pages start at 1 ...
    const [, setOrder] = useState("");
    const [, setOrderWeight] = useState("");

    const dogsPerPage = 8; 
    const indexOfLastDog = currentPage * dogsPerPage; 
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog); //currentdogs per page
  
    const paginado = (pageNumber) => {
      setCurrentPage(pageNumber); //currentpage state is updated with the page number
    };
  
    useEffect(() => {
      dispatch(getDogs());
    }, [dispatch]); //dispatching action to get all dogs from the store
  
    useEffect(() => {
      dispatch(getTemperaments()); //same here for the temperaments
    }, [dispatch]);
  
    const handleClick = (event) => {
      event.preventDefault();
      dispatch(getDogs()); // when theres an event the action is dispatched to get all the dogs from the store.
    }
  
    const handleFilterCreated= (event)=> {
      event.preventDefault();
      setCurrentPage(1); //better user expierence the filtered results will start once again in page 1
      dispatch(filterByCreated(event.target.value)); //when theres an event the dogs are filtered by the filterByCreated action depending on what option the user chooses
    }
  
    const handleTemperament = (event) => {
      event.preventDefault();
      setCurrentPage(1);
      dispatch(filterByTemperament(event.target.value)); //filter by all temperaments or by temperament selected by user.
    }
  
    const handleOrderByName= (event) => {
      event.preventDefault();
      dispatch(orderByName(event.target.value));
      setCurrentPage(1);
    //   setOrder(`Arranged ${event.target.value}`);// a sgtring that represents arranged option selected
    }
  
    const handleByWeight = (event) => {
      event.preventDefault();
      setCurrentPage(1);
      dispatch(filterByWeight(event.target.value));
      setOrderWeight(`Arranged ${event.target.value}`);
    }
  
    return (
      <div>
        <div className="rectangle"></div>
        <h1 className="logo">THEDOGAPP</h1>
        <img className="paw" src={paw} alt="pawlogo"></img>
        <button className="dogsButton" onClick={(event) => { handleClick(event) }}>BRING ALL THE DOGS BACK!</button>
        <NavLink to="/dog"><img className="doggie" src={doggie} alt="doggie"></img></NavLink>
        <p className=" createDog">ADD A DOG TO THE LIST</p>
        <SearchBar />
        <img className="arrow" src={arrow} alt="arrow"></img>
  
        <div className="filters">
          <p className="filterText">Filters:</p>
          <div className="selectMenus">
            <select className="nameOrder" onChange={(event) => { handleOrderByName(event) }}>
              <option value="ascendente">A-Z</option>
              <option value="descendente">Z-A</option>
            </select>
  
            <select onChange={(event) => { handleFilterCreated(event) }}>
              <option value="All">All Breeds</option>
              <option value="api">Existent Breeds</option>
              <option value="created">Breeds created</option>
            </select>
  
            <select onChange={event => { handleTemperament(event) }}>
              <option key={0} value="All" hidden>Sort by Temperament</option>
              {allTemperaments?.sort((a, b) => {
                if (a.name > b.name) return 1;
                if (a.name < b.name) return -1;
                return 0;
              }).map(temp => {
                return <option key={temp.id} value={temp.name}>{temp.name}</option>;
              })}
            </select>
  
            <select onChange={handleByWeight}>
              <option value="allWeights">Sort by Weight</option>
              <option value="asc">Lighter to Heavier</option>
              <option value="desc">Heavier to Lighter</option>
            </select>
          </div>
        </div>
  
        <div className="allCards">
          {currentDogs?.map((dog) => (
            <div key={dog.id} className="card-home">
              <NavLink className="navLink" to={"/dogs/" + dog.id}>
                <Card key={dog.id} name={dog.name} weightMin={dog.weightMin} weightMax={dog.weightMax} heightMin={dog.heightMin} heightMax={dog.heightMax} image={dog.image} life_span={dog.life_span} />
              </NavLink>
            </div>
          ))}
        </div>
  
        <Paginado
          dogsPerPage={dogsPerPage}
          allDogs={allDogs.length}
          paginado={paginado}
          currentPage={currentPage}
        />
      </div>
    );
  }