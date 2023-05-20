const {Dog, Temperament} = require("../db")


const postDog = async(req,res) =>{
    const {name,heightMin, heightMax,weightMin,weightMax,image,life_span, createdInDb, temperaments} = req.body;
    //user will provide all the information wia the body
    try{
        if (await Dog.findOne({ where: { name } }))
			return res.status(400).send("This dog already exists."); // lets avoid dog duplicates

    let newDog = await Dog.create({ // if no duplicate is found then dog is created.
        name,
        heightMin,
        heightMax,
        weightMin,
        weightMax,
        image,
        life_span, 
        createdInDb

    })

    let temperamentsDB = await Temperament.findAll({
            where: {name: temperaments } // we want to find all the temperaments that match the temperaments provided via body.
        });

        newDog.addTemperament(temperamentsDB) // once found we add them to our new dog created. The dog and temperament relationship is established in this step, for this dog created.

    res.status(200).send(`The dog ${name} was created`)
    } catch(error){
        res.status(404).json({error: error.message})
    }

}


module.exports = postDog