const {Dog} = require ("../db")

const updateDog = async (req,res) => {

    const {id} = req.query;
    const {name, heightMin,heightMax, weightMin, weightMax, image,life_span, temperament} = req.body
    try{

        if(!id) res.status(404).json({error: "Missing ID, unable to modify Dog information"})
            else{
                const dogID = await Dog.findByPk(id);
                if(!dogID) return res.status(404).json({error: "There is no dog associated to the ID provided"})
                else{
                    const updatedDog = await dogID.update({ // if no new information is provided then the dogs keeps its exisiting information 
                        name: name || dogID.name,
                        heightMin: heightMin || dogID.heightMin, 
                        heightMax: heightMax || dogID.heightMax,
                        weightMin : weightMin || dogID.weightMin,
                        weightMax : weightMax || dogID.weightMax,
                        life_span: life_span || dogID.life_span,
                        image: image || dogID.image,
                        temperament: temperament || dogID.temperament
                    });
                    res.status(200).json({ message: "Dog information updated successfully", dog: updatedDog });
                }

            }

       

    }

    catch(error) {
        res.status(404).json({ error: error.message });
    }


}


module.exports = updateDog