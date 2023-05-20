import axios from "axios";
import { GET_DOGS, FILTER_BY_CREATED, FILTER_BY_TEMPERAMENT, ORDER_BY_NAME, GET_NAME_DOGS, POST_DOG, GET_TEMPERAMENTS, FILTER_BY_WEIGHT, GET_DOG_DETAIL} from "./action-types";
const endpoint ="http://localhost:3001/dogs"

export function getDogs(){
    return async function(dispatch){   //aca en donde se conecta el front con el back
        let response = await axios.get(endpoint);
        return dispatch({
            type: GET_DOGS,
            payload: response.data
        });
    };
};

export function getTemperaments(){
    return async function(dispatch){
        let response = await axios.get("http://localhost:3001/temperaments",{});
        return dispatch({
            type:GET_TEMPERAMENTS,
            payload: response.data
        })
    }
}

export function postDog(payload){
    return async function(dispatch) {
        let response = await axios.post(endpoint, payload)
        return response
    }
}

export function filterByCreated(payload){
    return{
        type: FILTER_BY_CREATED,
        payload,

    }
}

export function filterByTemperament(payload){
    return{
        type: FILTER_BY_TEMPERAMENT,
        payload
    }
}

export function orderByName(payload){
    return{
        type:ORDER_BY_NAME,
        payload
    }
}

export function filterByWeight(payload){
    return{
        type: FILTER_BY_WEIGHT,
        payload
    }

}
export function getNameDogs(payload){

    return async function (dispatch) {
        try{
            let response = await axios.get(`${endpoint}?name=${payload}`);
            return dispatch ({
                type: GET_NAME_DOGS,
                payload: response.data
            })
        }catch(error){
            console.log(error)

        }


    }
}

export function getDogDetail(id){
    return async function (dispatch){
        try{

            let response = await axios.get("http://localhost:3001/dogs/" + id)
            return dispatch({
                type: GET_DOG_DETAIL,
                payload: response.data
            })

        } catch(error) {
            console.log(error)
        }
    }
}