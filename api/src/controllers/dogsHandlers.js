const axios = require('axios');
const {Dog , Temperament} = require('../db')
require('dotenv').config()

const URL = process.env.API_URL;
const MYAPI_KEY = process.env.API_KEY;

const getApiInfo = async () => {
    const apiUrl = await axios.get(`${URL}${MYAPI_KEY}`);
    const apiInfo = await apiUrl.data.map(ch => {
        return  {
            id : ch.id,
            image : ch.image.url,
            name: ch.name,
            weight : ch.weight.imperial,
            height : ch.height.imperial,
            life_span : ch.life_span
        };
    })
    return apiInfo;
} 


const getDogDb = async () => {
    return await Dog.findAll({
        include : {
            model : Temperament,
            attributes : ['name'],
            through : {
                attributes : [],
            }
        }
    })
};


const getAllCharacter = async () => {
    const  apiInfo = await getApiInfo();
    const  dogDb = await getDogDb();
    const infoTotal = apiInfo.concat(dogDb)
    return infoTotal;
}

const getAllCharacters = async (req,res) => {
        const name = req.query.name;
        let charactersTotal = await getAllCharacter();
        if(name) {
            let characterName = await charactersTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
            characterName.length ? 
            res.status(200).json(characterName) :
            res.status(400).json('No esta el personaje');
        } else {
            res.status(200).json(charactersTotal)
        }
}


module.exports = {
    getAllCharacters,
    getApiInfo
}
