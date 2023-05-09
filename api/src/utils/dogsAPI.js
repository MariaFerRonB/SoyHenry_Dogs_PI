const axios = require("axios"); 
const {API_KEY} = process.env;
const URL = "https://api.thedogapi.com/v1/breeds"

const getDogApi = async () => {
    const apiResponse = await axios.get (`${URL}?api_key=${API_KEY}`)
    const dogApiInfo = await apiResponse.data.map(dog =>{
        return {
            id: dog.id,
            name:dog.name,
            weight: dog.weight.metric,
            height:dog.height.metric,
            life_span: dog.life_span,
            temperament: dog.temperament,
            image : dog.image.url


        }
    })

    return dogApiInfo;

}


module.exports = getDogApi;