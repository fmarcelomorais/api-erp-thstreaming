const {v4: uuidv4} = require('uuid');
class ResellerModel{
       Id = uuidv4(); 
    constructor(name , phone, email, observation, id_Panel){
        this.Name = name;
        this.Phone = phone;
        this.Email = email;
        this.Observation = observation;
        this.Id_Panel = id_Panel
    }
}

module.exports = ResellerModel;
