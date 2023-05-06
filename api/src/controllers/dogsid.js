const {getAllCharacter} = require('./dogsHandlers');

const getDogId = async (req,res) => {
    try {
        const {id} = req.params;
        const allDogs = await getAllCharacter();
        if (id) {
            let FilterDogs = await allDogs.filter((el) => el.id == id)
            FilterDogs.length ? 
            res.status(200).send(FilterDogs) :
            res.status(404).json({message: 'No tengo el personaje'});
        }
    } catch (error) {
        res.status(404).json({error: message.error})
    }
}

module.exports = {
    getDogId ,
}
