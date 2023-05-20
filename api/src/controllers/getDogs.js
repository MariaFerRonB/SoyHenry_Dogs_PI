const getAllDogs = require("../utils/getAllDogs")

const getDogs = async(req,res) => {

      //It maight be the case of the user wanting to look for a specific breed, if so the breed name will be provided via query
        const {name} = req.query

        try {
        const allDog = await getAllDogs(); // Is calling both the DB and the API information
        if(name){  // if a name is provided then we apply a filter to look for all that match the criteria
            let dogsFiltered= await allDog.filter( 
                dog => dog.name.toLowerCase().includes(name.toLocaleLowerCase())); // to avoid any discrepencies, both are tranformed to only have lower case letters
                dogsFiltered ? 
                res.status(200).send(dogsFiltered): //if any dogs are found with the name provided, then they are returned to the user
                res.status(404).send('Name not found'); // if not then a 404 is returned.
        }else {
            res.status(200).send(allDog);  // If no breed name is provided then ALL dogs are provided.
        } 
    }
    catch(error){
        res.status(404).json(error)
    }
}


module.exports = getDogs;