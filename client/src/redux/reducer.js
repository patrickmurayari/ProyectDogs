import { GET_CHARACTERS , 
        FILTER_CREATED , 
        ORDER_ALFABETICO , 
        ORDER_PESO, 
        GET_TEMPERAMENTS, 
        GET_NAME_SEARCH, 
        POST_DOG,
        FILTER_TEMPERAMENTS} 
    from "./typeActions";

const initialState = {
    dogCharacters : [],
    alldogsCharacters :[],
    dogstemperaments : [],
    dogDetail:[],
    dogstemperamentsFilter : []
}

const rootReducer = (state = initialState, {type,payload}) => {
    switch (type) {
        case GET_CHARACTERS:
            return {
                ...state,
                dogCharacters: [...payload],
                alldogsCharacters: [...payload]
            }
        case GET_TEMPERAMENTS:
            return{
                ...state,
                dogstemperaments: [...payload]
            }
        case GET_NAME_SEARCH:
            return {
                ...state,
                dogCharacters: [...payload]
            }
        case POST_DOG: 
            return {
                ...state,
            }
        case FILTER_TEMPERAMENTS:
            return {
                ...state,
                dogstemperamentsFilter : [...payload]
            }    
        case FILTER_CREATED:
            let filteredDogs = payload === 'created'? state.alldogsCharacters.filter(el => el.createdInDb) : state.alldogsCharacters.filter(el => el.hasOwnProperty(el.createdInDb) === false)
            let filteredAll = payload === 'all'? state.alldogsCharacters : filteredDogs
            return{
                dogCharacters : filteredAll
            }
        case ORDER_ALFABETICO:
            let sortedArr = payload === "ascAlfa" ? 
                state.dogCharacters.sort(function (a,b) {
                    if(a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1;
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return -1;
                    }
                    return 0
                }) : 
                state.dogCharacters.sort(function (a,b) {
                    if(a.name.toLowerCase() > b.name.toLowerCase()) {
                        return -1;
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return 1;
                    }
                    return 0
                })
            return{
                ...state,
                dogCharacters : [...sortedArr]
            }
        case ORDER_PESO:
            let sortedArrPeso = payload === "ascPeso" ? 
            state.dogCharacters.sort(function (a,b) {
                if(a.peso > b.peso) {
                    return 1;
                }
                if (b.peso > a.peso) {
                    return -1;
                }
                return 0
            }) : 
            state.dogCharacters.sort(function (a,b) {
                if(a.peso > b.peso) {
                    return -1;
                }
                if (b.peso > a.peso) {
                    return 1;
                }
                return 0
            })
            return {
                ...state,
                dogCharacters : [...sortedArrPeso],
            }
        default:
            return {...state}
    }

}

export default rootReducer;