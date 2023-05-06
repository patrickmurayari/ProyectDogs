const axios = require('axios');
const {Dog , Temperament} = require('../db')
require('dotenv').config()

const URL = process.env.API_URL;
const MYAPI_KEY = process.env.API_KEY;

const getApiInfo = async () => {
    try {
        const apiUrl = await axios.get(`${URL}${MYAPI_KEY}`);
        const apiInfo = await apiUrl.data.map(ch => {
            const temperaments = ch.temperament?.split(', ')
            // console.log(c);
            return  {
                id : ch.id,
                imagen : ch.image.url,
                name: ch.name,
                peso : ch.weight.imperial,
                altura : ch.height.imperial,
                lifes_span : ch.life_span,
                temperament : temperaments
            };
        })
        return apiInfo;
    } catch (error) {
        res.status(404).json({error: message.error})
    }
} 


const getDogDb = async () => {
    try {
        return await Dog.findAll({
            include : {
                model : Temperament,
                attributes : ['name'],
                through : {
                    attributes : [],
                }
            }
        })
    } catch (error) {
        res.status(404).json({error: message.error})
    }
};


const getAllCharacter = async () => {
    try {
        const  apiInfo = await getApiInfo();
        const  dogDb = await getDogDb();
        const infoTotal = apiInfo.concat(dogDb)
        return infoTotal;
    } catch (error) {
        res.status(404).json({error: message.error})
    }
}

const getAllCharacters = async (req,res) => {
    try {
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
    } catch (error) {
        res.status(404).json({error: message.error})
    }
}


module.exports = {
    getAllCharacters,
    getAllCharacter
}
