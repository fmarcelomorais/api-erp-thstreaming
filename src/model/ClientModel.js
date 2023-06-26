const {v4: uuidv4} = require('uuid');

class ClientModel{
        Id = uuidv4();
    constructor(name, phone, observation){
        this.Name = name;
        this.Phone = phone;
        this.Observation = observation;
    }
}

module.exports = ClientModel;