const {Dog, Temperament} = require ("../db")


const getDogDb = async () => {
    return await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        },
    });
}

module.exports = getDogDb;