import React from "react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {postDog, getTemperaments} from "../../Redux/Actions/actions"
import "./DogCreate.css"
import validate from "./validate";
import paw from "../Home/images/paw.png"

export default function DogCreate(){

const dispatch = useDispatch();
const navigate =useNavigate()
const allTemperaments = useSelector((state => state.temperaments))
const existingDogs= useSelector(state => state.dogs)

const[input, setInput] =useState({
    name:"",
    image:"",
    life_span:"",
    weightMin:"",
    weightMax:"",
    heightMin:"",
    heightMax:"",
    temperaments:[]
})

const[errors, setErrors] = useState({})



useEffect(() => {
    dispatch(getTemperaments());
},[dispatch]);

function handleChange(event) {

    setInput({
        ...input,
        [event.target.name]: event.target.value,
    });
 
    setErrors(validate({
        ...input,
        [event.target.name]: event.target.value,
    }));

}

const handleSelect =(event) => {
   setInput({
    ...input,
    temperaments:[...input.temperaments, event.target.value]
});
setErrors(validate({
    ...input,
    [event.target.name]: event.target.value,
}));
}

const handleDelete = (temp) =>{
    
    setInput({
        ...input,
        temperaments: input.temperaments.filter(temps => temps !== temp)
    })
}

function handleSubmit(event) {
    event.preventDefault();
    const isDogExists = existingDogs.some((dog) => dog.name === input.name);
    if (isDogExists) {
        alert("This dog breed already exists.");
        return;
      }
    if (!Object.getOwnPropertyNames(errors).length && input.name && input.heightMin && input.heightMax && input.weightMin && input.weightMax && input.life_span && input.temperaments.length) {
        dispatch(postDog(input));
        alert('Doggie created');
        setInput({
            name: '',
            heightMin: '',
            heightMax: '',
            weightMin: '',
            weightMax: '',
            life_span: '', 
            image: '',
            temperaments: [],
        });
        navigate('/home');
    } else {
        alert('Dog can´t be created, missing data')
    }
}
return (

    <div>
       
        <div className="rectangle"></div>
        <h1 className="logo">THEDOGAPP</h1>
        <div className="dogCreation">
        <img className="paw2" src ={paw} alt="pawlogo"></img>
        <NavLink className="homeNavLink" to="/home">
            
            <span class="material-symbols-outlined">home</span>
            <span class="material-symbols-outlined2">
            <span class="material-symbols-outlined">
arrow_back
</span>

</span>

        </NavLink>
        <h1 className="createTitle">ADD A DOG BREED</h1>
        <form onSubmit ={event => handleSubmit(event)}>
            <div>
                <div>
                <label className="breedTitle">Breed:</label>

                    <input type='text' value={input.name} name='name' onChange={event => handleChange(event)} />
                    {errors.name && (
                        <p className='error'><strong>{errors.name}</strong></p>
                    )}
                </div>
                <div>
                <label>Minimum Height:</label>
                <input onChange ={event => handleChange(event)} type="number" value={input.heightMin} name="heightMin"></input>
                
                {errors.height && (
                        <p className='error'><strong>{errors.height}</strong></p>
                    )}
                </div>
                <div>
                <label>Maximum Height:</label>
                <input onChange ={event => handleChange(event)} type="number" value={input.heightMax} name="heightMax"></input>
                {errors.heightMax&& (
                        <p className='error'><strong>{errors.heightMax}</strong></p>
                    )}
                </div>
                <div>
                <label>Minimum Weight:</label>
                <input onChange ={event => handleChange(event)}type="number" value={input.weightMin} name="weightMin"></input>
                {errors.weight&& (
                        <p className='error'><strong>{errors.weight}</strong></p>
                    )}
                </div>
                <div>
                <label>Maximum Weight:</label>
                <input onChange ={event => handleChange(event)} type="number" value={input.weightMax} name="weightMax"></input>
                {errors.weightMax&& (
                        <p className='error'><strong>{errors.weightMax}</strong></p>
                    )}
                </div>
                <div>
                <label>Life Expentancy:</label>
                <input onChange ={event => handleChange(event)} type="text" value={input.life_span} name="life_span"></input>
                {errors.life_span && (
                        <p className='error'><strong>{errors.life_span}</strong></p>
                    )}
                </div>
                <div>
                <label>Image:</label>
                <input onChange ={event => handleChange(event)}type="text" value={input.image} name="image"></input>
                {errors.image&& (
                        <p className='error'><strong>{errors.image}</strong></p>
                    )}
                </div>
                <div>
                <label>Temperaments</label>
                <select className="temperamentOption" onChange ={handleSelect}>
                    <option value="allTemps" hidden>Choose all that apply...</option>
                    {allTemperaments?.sort((a,b) =>{
                        if(a.name> b.name) return 1
                        if(a.name < b.name) return -1
                        return 0
                    }).map(temp => {
                        return (
                            <option value ={temp.name} key={temp.id}>{temp.name}</option>
                        )
                    })}
                </select>
                {errors.temperaments && (
                        <p className='error'><strong>{errors.temperaments}</strong></p>
                    )}

                <ul className="listedTemp"><li>{input.temperaments.map(temp => temp + ", ")}</li></ul>
                </div>

                <button className="submitCreate" type="submit">Create</button>
            </div>
        </form>

        {input.temperaments.map(temp => {
            return (
    
               <ul className='allTemps' key={temp}>
                                    <li >
                                        <p className='temp'><strong>{temp}</strong></p>
                                        <button className="xButton" onClick={() => handleDelete(temp)}  >X</button>
                                    </li>
                                </ul>
         
            )
        })}
     
        </div>
    </div>
)

}