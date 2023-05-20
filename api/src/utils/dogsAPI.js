const axios = require("axios"); 
const {API_KEY} = process.env;
const URL = "https://api.thedogapi.com/v1/breeds"

const getDogApi = async () => {
    const apiResponse = await axios.get (`${URL}?api_key=${API_KEY}`)
    //The response from the API provides a huge object, our dogs are contained withing the "data property"
    const dogApiInfo = await apiResponse.data.map(dog =>{ // We go through each dog and we obtain the desired data and we create a new object
        return {
            id: dog.id,
            name:dog.name,
            weightMin: dog.weight.metric.split("-")[0],
            weightMax: dog.weight.metric.split("-")[1],
            heightMin:dog.height.metric.split("-")[0],
            heightMax: dog.height.metric.split("-")[1],
            life_span: dog.life_span,
            temperament: dog.temperament,
            image : dog.image.url


        }
    })

    return dogApiInfo;

}


module.exports = getDogApi;