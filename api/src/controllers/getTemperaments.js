
const {Temperament} = require ("../db")
const getDogApi = require ("../utils/dogsAPI")

const getTemperaments = async (req, res) => {
    try{

        let allTemperaments = Temperament.findAll(); //brings all the temperaments from the DB

        if(!allTemperaments.length) {
            dogApi = await getDogApi(); // this might be our first time calling the temperaments so our temperament table could be  empty.
            //therefore we bring all the information from the API
            const temperaments = dogApi.map( dog => dog.temperament)
            .join(", ")
            .split(", ")
            .filter(temp => temp); // and we create a new array with all the temperaments. 

        temperaments.forEach(async temp => { // now for each we verify with findOrcreate if they exist in our database
            await Temperament.findOrCreate({
                where: { name: temp }, 
            });
        });

        allTemperaments = await Temperament.findAll(); // bring all temperaments from the DB
    }

    return res.status(200).send(allTemperaments);
} catch (error) {
    res.status(404).json(error)
}
};

module.exports = getTemperaments;