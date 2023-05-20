import './App.css';
import {Route, Routes} from 'react-router-dom';
import Landing from "../src/components/Landing/Landing"
import Home from './components/Home/Home';
import DogCreate from './components/DogCreate/DogCreate';
import Details from './components/Details/Details';

function App() {
  return (
    <div className="App">
    
     <Routes>
       <Route path = "/" exact element = {<Landing/>}/>
      <Route path ="/home" element ={<Home/>}></Route>
      <Route path ="/dog" element ={<DogCreate/>}></Route>
      <Route path ="/dogs/:id" element = {<Details/>}></Route>
       
     </Routes>
   
     </div>  
    
  );
}

export default App;
