const validate = input => {

    let errors = {};

    if(!input.name) errors.name ="*Breed is required"
    else{
        if(!/^[a-zA-Z]+$/.test(input.name)) errors.name="*No numbers or special characters are allowed in this field."
    }

    if(input.heightMin && input.heightMax){
        if(input.heightMin === input.heightMax) errors.height ="*Height values can not be equal"
        else if (Number(input.heightMin) > Number(input.heightMax)) errors.height ="*Min height value cannot be higher than the max height"
        else if (
                Number(input.heightMin) < 1 || Number(input.heightMin > 150)) errors.height ="*Please enter valid height values (1-150)" 
        else if(Number(input.heightMax) < 1 || Number(input.heightMax > 150))errors.heightMax ="*Please enter valid height values (1-150)" 
        
          } else{
            if(!input.heightMin && !input.heightMax) errors.height="*Height values required to continue"
            if(!input.heightMin && input.heightMax) errors.height="*Min height value required to continue"
            if(input.heightMin && !input.heightMax) errors.heightMax="*Max height value required to continue"
          }

        


      if(input.weightMin && input.weightMax){
        if(input.weightMin === input.weightMax) errors.weight ="*Weight values can not be equal"
        else if (Number(input.weightMin) > Number(input.weightMax)) errors.weightMin="*Min weight value cannot be higher than the max weight"
        else if (
                Number(input.weightMin) < 1  || Number(input.weightMin > 150))
                errors.weight ="*Please enter valid valid weight values (1-150)"
        else if(Number(input.weightMax) < 1 || Number(input.weightMax > 150)) errors.weightMax ="*Please enter valid valid weight values (1-150)"
        
            } else{
                if(!input.weightMin && !input.weightMax) errors.weight="*Weight values required to continue"
                if(!input.weightMin && input.weightMax) errors.weight="*Min weight value required to continue"
                if(input.weightMin && !input.weightMax) errors.weightMax="*Max weight value required to continue"
              }
      
        if(input.image) {
            if(!/^https:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,}(\/\S*)?$/.test(input.image)) errors.image ="*Invalid URL"
    
        } 


        if(!input.temperaments.length) {
            errors.temperaments="*Select at least one temperament to continue"
        }

        if(!input.life_span) errors.life_span="*Enter a Life Expectancy to continue"
      
      
        return errors;

}

export default validate