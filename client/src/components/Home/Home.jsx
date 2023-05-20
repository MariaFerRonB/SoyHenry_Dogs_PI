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


export default function Home(){
// const [loading, setLoading] = useState(true)
const dispatch = useDispatch();
const allDogs = useSelector((state) => state.dogs)
const allTemperaments = useSelector((state => state.temperaments))

const [currentPage, setCurrentPage] = useState(1)
const [, setOrder] = useState('')
const [, setOrderWeight] = useState('')
const[dogsPerPage,] =useState(8)
const indexOfLastDog = currentPage * dogsPerPage
const indexOfFirstDog = indexOfLastDog - dogsPerPage
const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog)

const paginado = (pageNumber) =>{
     setCurrentPage(pageNumber)
}


// useEffect(()=> {
//     const getDoggies = async () => {
//     await dispatch(getDogs())
//     setLoading(false)
// } 
// getDoggies()
// },[dispatch])

useEffect(() => {
    dispatch(getDogs())
}, [dispatch])



useEffect(() => {
    dispatch(getTemperaments())
}, [dispatch])


    function handleClick (event) {
        event.preventDefault();
        dispatch(getDogs());
    }

    function handleFilterCreated(event) {
         event.preventDefault();
        dispatch(filterByCreated(event.target.value))
    }

    function handleTemperament(event) {
        event.preventDefault();
        setCurrentPage(1)
        dispatch(filterByTemperament(event.target.value))
    }

    function handleOrderByName(event) {
        event.preventDefault();
        dispatch(orderByName(event.target.value))
        setCurrentPage(1)
        setOrder(`Arranged ${event.target.value}`) 
    }

    const handleByWeight = (event) => {
        event.preventDefault();
        setCurrentPage(1)
        dispatch(filterByWeight(event.target.value))
        setOrderWeight(`Arranged ${event.target.value}`) 
    }



    return(
        <div>
            <div className="rectangle"></div>
            <h1 className="logo">THEDOGAPP</h1>
            <img className="paw" src ={paw} alt="pawlogo"></img>
       
            <button className="dogsButton" onClick = {event =>{handleClick(event)} }>BRING ALL THE DOGS BACK!</button>
            {/* <span class="material-symbols-outlined">expand_more</span> */}
            <NavLink  to="/dog"><img className="doggie" src={doggie} alt="doggie"></img></NavLink>
            <p className=" createDog">ADD A DOG TO THE LIST</p>
            <SearchBar/>
                 <img className="arrow" src={arrow} alt="arrow"></img>
            

            <div className="filters">
            <p className="filterText">Filters:</p>
            <div className="selectMenus">
            <select className="nameOrder" onChange ={event => {handleOrderByName(event)}} >
            <option value="ascendente">A-Z</option>
            <option value ="descendente">Z-A</option>
            </select>

            <select onChange ={event => {handleFilterCreated(event)}}>
                <option value="All" >All Breeds</option>
                <option value="api">Existent Breeds</option>
                <option value="created">Breeds created</option>
            </select>

            <select onChange={event => {handleTemperament(event)}}>
                <option key ={0} value="All" hidden>Sort by Temperament</option>
                {allTemperaments?.sort((a,b) => {
                    if(a.name > b.name) return 1
                    if(a.name < b.name) return -1
                    return 0
                }).map(temp => {
                    return <option key={temp.id} value={temp.name}>{temp.name}</option>
                })}
            </select>

            <select onChange ={handleByWeight}>
                <option value="allWeights">Sort by Weight</option>
                <option value="asc">Lighter to Heavier</option>
                <option value="desc">Heavier to Lighter</option>
            </select>
            </div>
             </div>
             
           
         

            <div className="allCards">
{
            // loading ? <p>Loading...</p> :
            currentDogs?.map ((dog) => {
            return(
                <div key={dog.id} className='card-home'>
                      <NavLink className= "navLink" to={"/dogs/" + dog.id}>
                     <Card key={dog.id} name = {dog.name} weightMin = {dog.weightMin} weightMax = {dog.weightMax} heightMin = {dog.heightMin} heightMax = {dog.heightMax} image = {dog.image} life_span={dog.life_span}/>
                     </NavLink>
                </div>
        )}
        )}
        </div>
     <Paginado
            dogsPerPage={dogsPerPage}
            allDogs={allDogs.length}
            paginado= {paginado} />
            
        </div>
    )
}


