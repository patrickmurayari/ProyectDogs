
import  {GET_CHARACTERS, 
        GET_TEMPERAMENTS , 
        FILTER_CREATED, 
        ORDER_ALFABETICO, 
        ORDER_PESO , 
        GET_NAME_SEARCH, 
        POST_DOG,
        FILTER_TEMPERAMENTS,
        HANDLE_NUMBER, 
        PREV_PAGE,
        NEXT_PAGE
        } 
        from "./typeActions"

import axios from "axios";

export function getCharacters () {
    return async function(dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/dogs/all`)
            return dispatch ({
                type : GET_CHARACTERS,
                payload : json.data
                    })
        } catch (error) {
            alert(`Message ${GET_CHARACTERS}:`,error);
        }     
    }
}

export function getTemperaments () {
    return async function(dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/temperaments`, {
            })
            return dispatch({
                type : GET_TEMPERAMENTS,
                payload : json.data
            }) 
        } catch (error) {
            alert(`Message ${GET_TEMPERAMENTS}:`,error);
        }
    }
}

export function filterTemperaments (payload) {
    return {
        type : FILTER_TEMPERAMENTS,
        payload
    }
}

export function getNameSearch (name) {
    return async function (dispatch) {
        try {
            var getName = await axios.get(`http://localhost:3001/dogs/all?name=${name}`);
            return dispatch({
                type: GET_NAME_SEARCH,
                payload: getName.data
            })
        } catch (error) {
            alert(`Message ${GET_NAME_SEARCH}:`,error);
        }
    }
}

export function postDogs (payload) {
    return async function (dispatch) {
        try {
            // console.log(payload);
            const post = await axios.post(`http://localhost:3001/dogs/postDog`,payload);
            return post;
        } catch (error) {
            alert(`Message ${POST_DOG}:`,error);
        }
    }
}


export function handleNumber (payload) {
    return {
        type : HANDLE_NUMBER,
        payload
    }
}


export function filterCreated (payload) {
    return async function( dispatch) {
        try {
            var {data} = await axios.get(`http://localhost:3001/dogs/all`)
            let filter = payload === "created"? data.filter((el) => el.hasOwnProperty("createdInDb")) : data.filter((el) => !el.hasOwnProperty("createdInDb"));
            return dispatch ({
                type: FILTER_CREATED,
                payload: filter,
            })
        } catch (error) {
            alert(`Message ${FILTER_CREATED}:`,error)
        }
    }
}

export function orderAlfabetico (payload) {
    return {
        type: ORDER_ALFABETICO,
        payload,
    }
}

export function orderPorPeso (payload) {
    return {
        type: ORDER_PESO,
        payload,
    }
}

export function prevPage() {
    return {
      type: PREV_PAGE,
    };
  }
  
  export function nextPage() {
    return {
      type: NEXT_PAGE,
    };
  }