import React from 'react';
import "./Card.css"


export default function Card ({key, name,image,heightMin,heightMax, weightMax, weightMin, life_span}){
    return (
    
       <div className='card' >
            <h1 className='info' >{name}</h1>
            <img className="dogPhoto" src={image} alt={`${name}`}/>
            <h3 className='height'>Height: {heightMin}-{heightMax}</h3> 
            <h3 className="weight">Weight: {weightMin}-{weightMax}</h3>
            <h3 className="life_span"> Life Expentancy: {life_span}</h3>

            
        
        </div>
        
    )
}