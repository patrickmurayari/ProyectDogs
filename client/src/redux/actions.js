import  {GET_CHARACTERS, 
        GET_TEMPERAMENTS , 
        FILTER_CREATED, 
        ORDER_ALFABETICO, 
        ORDER_PESO , 
        GET_NAME_SEARCH, 
        POST_DOG,
        FILTER_TEMPERAMENTS,
        HANDLE_NUMBER, 
        } 
        from "./typeActions"

import axios from "axios";

export const getCharacters = () => {
    return async function(dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/dogs/all`)
            return dispatch({
                type: GET_CHARACTERS,
                payload: json.data
            })     
        } catch (error) {
            console.log(`Message ${GET_CHARACTERS}:`,error);
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
            console.log(`Message ${GET_TEMPERAMENTS}:`,error);
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
            console.log(`Message ${GET_NAME_SEARCH}:`,error);
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
            console.log(`Message ${POST_DOG}:`,error);
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
    return {
        type : FILTER_CREATED,
        payload,
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