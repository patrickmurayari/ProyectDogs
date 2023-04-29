const {getApiInfo} = require('./dogsHandlers');

const getDogId = async (req,res) => {
    const {id} = req.params;
    const allDogs = await getApiInfo();
    if (id) {
        let FilterDogs = await allDogs.filter((el) => el.id === Number(id))
        FilterDogs.length ? 
        res.status(200).send(FilterDogs) :
        res.status(404).json({message: 'No tengo el personaje'});
    }
}

module.exports = {
    getDogId ,
}
