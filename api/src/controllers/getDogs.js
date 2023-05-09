const getAllDogs = require("../utils/getAllDogs")

const getDogs = async(req,res) => {
    const allDog = await getAllDogs()
      
        const name = req.query.name;
        if(name){ //si hay un nombre, filtralos y transforma mayusc por minusc
            let dogName= await allDog.filter( 
                dog => dog.name.toLowerCase().includes(name.toLocaleLowerCase()));
                dogName ? //encontraste un nombre?
                res.status(200).send(dogName):
                res.status(404).send('Name not found');
        }else {
            res.status(200).send(allDog); //sino hay name pasado por query, envia todos los dogs
        } 
}


module.exports = getDogs;