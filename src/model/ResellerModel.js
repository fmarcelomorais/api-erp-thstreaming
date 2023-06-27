const {v4: uuidv4} = require('uuid');
class ResellerModel{
       Id = uuidv4(); 
    constructor(name , phone, email, observation, idPanel){
        this.Name = name;
        this.Phone = phone;
        this.Email = email;
        this.Observation = observation;
        this.IdPanel = idPanel
    }
}

module.exports = ResellerModel;
