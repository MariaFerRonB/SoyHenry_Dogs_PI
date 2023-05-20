const {Dog, Temperament} = require("../db")
const getDogApi = require ("./dogsAPI")
const getDogDb = require("./dogsDB")

const getAllDogs = async ()=> {
    const apiDogs = await getDogApi();
    const dbDogs = await getDogDb();
    // Once the response from both functions is obtained we joing them by using concat
    const allDogs = apiDogs.concat(dbDogs);

    return allDogs;
};


module.exports = getAllDogs;