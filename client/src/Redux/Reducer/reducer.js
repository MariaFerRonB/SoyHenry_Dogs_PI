import { GET_DOGS, FILTER_BY_CREATED, FILTER_BY_TEMPERAMENT, ORDER_BY_NAME, GET_NAME_DOGS, GET_TEMPERAMENTS, POST_DOG, FILTER_BY_WEIGHT, GET_DOG_DETAIL } from "../Actions/action-types";

const initialState = {
    dogs: [],
	dogsFiltered: [],
	temperaments: [],
	detail: {},
};

function reducer(state = initialState, action) {
	switch (action.type) {
		case GET_DOGS:
			return {
				...state,
                dogs:action.payload,
				dogsFiltered: action.payload,
               
			};

            case GET_DOG_DETAIL:
                return{
                    ...state,
                    detail: action.payload
                }

            
        case GET_TEMPERAMENTS:
                return {
                    ...state,
                    temperaments:action.payload
                }
        case POST_DOG:
            return {
                ...state
            }
                
        case FILTER_BY_TEMPERAMENT:
                const allDogs = state.dogsFiltered
                const dogsFiltered = action.payload === "All" ? allDogs : allDogs.filter(dog => dog.temperament?.includes(action.payload))
            return {
                ...state,
                dogs: dogsFiltered
            }

        case FILTER_BY_CREATED:
                const allDogsList = state.dogsFiltered
                const dogsFilteredByCreation = action.payload === "All" ? allDogsList : action.payload === 'created'? allDogsList.filter((e)=> e.createdInDb): allDogsList.filter((e)=> !e.createdInDb)

            return{
                ...state,
                dogs: dogsFilteredByCreation
            }

        case ORDER_BY_NAME:
               const dogsfilteredName = action.payload==="ascendente" ? state.dogs.sort((a,b) => {
               if(a.name > b.name ) return 1
                if(a.name < b.name ) return -1
                return 0
               }) : 
               state.dogs.sort((a,b) => {
                if(a.name > b.name ) return -1
                if(a.name < b.name ) return 1
                return 0
               })
                return {
                    ...state,
                    dogs: dogsfilteredName
                    
                }
        case GET_NAME_DOGS:
			return {
				...state,
                dogs:action.payload,
				
			};

        case FILTER_BY_WEIGHT: {
            const dogsFilteredWeight = action.payload === "asc" ? 
            state.dogs.sort((a,b) => {
                return a.weightMin - b.weightMin
            }) :
            state.dogs.sort((a,b) =>{
               return b.weightMin - a.weightMin
            })
            return {
                ...state,
                dogs: dogsFilteredWeight
            }
        }

        default:
			return state
        }
    }
export default reducer;