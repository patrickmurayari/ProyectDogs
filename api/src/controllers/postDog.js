const {Dog , Temperament} = require('../db')

const postDogs = async (req,res) => {
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
    res.send("Se creo correctamente")
}

module.exports = {
    postDogs
} 