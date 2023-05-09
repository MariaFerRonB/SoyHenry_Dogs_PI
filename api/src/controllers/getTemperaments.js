
const {Temperament} = require ("../db")
const getDogApi = require ("../utils/dogsAPI")

const getTemperaments = async (req, res, next) => {
    try{

        let allTemperaments = Temperament.findAll();

        if(!allTemperaments.length) {
            dogApi = await getDogApi();

            const temperaments = dogApi.map( dog => dog.temperament)
            .join(", ")
            .split(", ")
            .filter(temp => temp);

        temperaments.forEach(async temp => {
            await Temperament.findOrCreate({
                where: { name: temp },
            });
        });

        allTemperaments = await Temperament.findAll();
    }

    return res.status(200).send(allTemperaments);
} catch (error) {
    next(error);
}
};

module.exports = getTemperaments;