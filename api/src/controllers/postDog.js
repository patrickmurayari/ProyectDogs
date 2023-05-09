const {Dog , Temperament} = require('../db')

const postDogs = async (req,res) => {
    try {
        let {name,imagen,altura1,altura2,peso1,peso2,lifes_span,temperament} = req.body
        let alturaTotal = altura1 + " - " + altura2;
        let pesoTotal = peso1 + " - " + peso2;
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