const{Dog} = require("../db")
const deleteDog = async (req, res) => {

  //lets say a customer would like to delte a dog byt its id, then the id would be provided via query.
    const { id } = req.query;
  
    try {
      if (!id) {
        res.status(404).json("Missing ID, Please enter the information needed"); // in case that the id is not provided then a 404 status is returned.
      } else {
        // Busca el perro en la base de datos
        const dog = await Dog.findByPk(id); //if an id is provided then we look for the corresponding dog. The PK for the dogs was the id therefore we use the findbyPK method
  
        if (!dog) {
          res.status(404).json({ error: "No dogs found with ID provided" }); // no dog founded, therefore a 404 error.
        } else {
          // Elimina el perro de la base de datos
          await dog.destroy();
          res.status(200).json({ message: "Dog deleted successfully" }); //dog found and deleted.
        }
      }
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };



module.exports = deleteDog