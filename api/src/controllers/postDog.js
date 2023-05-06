const {Dog , Temperament} = require('../db')

const postDogs = async (req,res) => {
    try {
        let {name,imagen,altura,peso,lifes_span,temperament} = req.body
        let dogCreated = await Dog.create({
            name,
            imagen,
            altura,
            peso,
            lifes_span
        })
        let DogDB = await Temperament.findAll({ where : { name : temperament }})
        dogCreated.addTemperament(DogDB);
        res.status(200).json({message : "Se creo correctamente"})
    } catch (error) {
        res.status(404).json({error: message.error})
        
    }
}

module.exports = {
    postDogs
} 