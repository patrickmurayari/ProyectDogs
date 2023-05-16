const {Dog , Temperament} = require('../db')

const postDogs = async (req,res) => {
    try {
        let {name,imagen,alturaMin,alturaMax,pesoMin,pesoMax,lifes_span,temperament} = req.body
        let alturaTotal = alturaMin + " - " + alturaMax;
        let pesoTotal = pesoMin + " - " + pesoMax;
        let dogCreated = await Dog.create({
            name,
            imagen,
            altura : alturaTotal,
            peso : pesoTotal,
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