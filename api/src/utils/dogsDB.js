const {Dog, Temperament} = require ("../db")


const getDogDb = async () => {
    return await Dog.findAll({ //All the dogs from the DB are being requested with the findAll method
        include: {
            model: Temperament, // The temperament table is included, but only with the name attribute
            attributes: ['name'],
            through: {
                attributes: [],
            },
        },
    });
}

module.exports = getDogDb;