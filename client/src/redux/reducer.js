import { GET_CHARACTERS , 
        FILTER_CREATED , 
        ORDER_ALFABETICO , 
        ORDER_PESO, 
        GET_TEMPERAMENTS, 
        GET_NAME_SEARCH, 
        POST_DOG,
        FILTER_TEMPERAMENTS,
        HANDLE_NUMBER
    } 
    from "./typeActions";

const initialState = {
    dogCharacters : [],
    alldogsCharacters :[],
    dogstemperaments : [],
    dogDetail:[],
    numPage : 1, 
    // dogstemperamentsFilter : []
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
        case HANDLE_NUMBER: 
            return {
                ...state,
                numPage : payload,
            }
        case FILTER_TEMPERAMENTS :
            let filterDog = state.alldogsCharacters.filter((el) => el.temperament?.includes(payload))
            return{
                ...state,
                dogCharacters: [...filterDog]
            }
        case FILTER_CREATED:
            return{
                numPage: 1,
                dogCharacters : payload 
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