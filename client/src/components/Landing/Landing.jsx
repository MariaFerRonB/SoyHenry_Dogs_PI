import React from "react"; 
import {NavLink} from "react-router-dom"
import "./Landing.css"
import myImage from "./images/perrito.jpg"
import paw from "../Home/images/paw.png"

export default function Landing () {
    return (
        
        <div className ="landing">
              <div className="rectangle"></div>
              <h1 className="logo">THEDOGAPP</h1>
              <img className="paw2" src ={paw} alt="pawlogo"></img>
            <div className="welcomeMessage">
            <h1 className="welcoming">Welcome to the best Dog Search App!</h1>
            <NavLink to="/home">
            <button className="enterButton" type="button">Start the search!</button>
            </NavLink>
            </div>
            <img className = "perrito" src ={myImage}></img>
         
        </div>
    )

}