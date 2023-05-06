const axios = require('axios');
const {Dog , Temperament} = require('../db')
require('dotenv').config()

const URL = process.env.API_URL;
const MYAPI_KEY = process.env.API_KEY;

const  allTemperaments = async (req,res) => { 
    try {
        const apiUrl = await axios.get(`${URL}${MYAPI_KEY}`);
        const apiInfo = await apiUrl.data.filter((el) => el.temperament != null && el.temperament != undefined )
        
        const temp = await apiInfo.map((el) => ({
            name: el.temperament.split(", "),
            id: el.id
        }))
        let resultArr = [];
    
        temp.forEach(el => {
            el.name.forEach(ele => {
                resultArr.push(ele)
            })
        });
    
        resultArr.forEach((el) => {
            Temperament.findOrCreate({
                where : {name : el}
            })
        })
    
        const allTemperament = await Temperament.findAll();
        res.status(200).json(allTemperament)
    } catch (error) {
        res.status(404).json({error: message.error})
    }
}

module.exports = {
    allTemperaments
}
