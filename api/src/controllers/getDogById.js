
const{Dog} = require("../db")
const getAllDogs = require("../utils/getAllDogs")

const getDogById = async (req ,res) => {
    const {id} =req.params;
    try{
        const allDogs = await getAllDogs(); // brings bothe the db and the API information.
       if(id){
        let dogsFiltered = await allDogs.find(dog => dog.id == id) // For this case find method is used, as there is going to be only ONE dog per id.
        dogsFiltered ?
        res.status(200).json(dogsFiltered) //if dog found, dog returned. 
        : res.status(404).json("No dog found ") //dog not found, 404 error. 
       }
    }catch(error){
        res.status(404).json({error:error.message})
    }

}


module.exports = getDogById