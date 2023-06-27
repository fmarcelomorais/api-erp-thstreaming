const {v4: uuidv4} = require('uuid');
class PanelModel{
        Id = uuidv4();  
    constructor(name, login, password, url, credits, observation, datePaymentCredits, dateRegister, idReseller){
        this.Name = name;
        this.Login = login;
        this.Password = password;
        this.Url = url;
        this.Credits = credits;
        this.Observation = observation;
        this.DatePaymentCredits = new Date(datePaymentCredits);
        this.DateRegister = new Date(dateRegister); 
        this.FK_Reseller = idReseller;
    }
}

module.exports = PanelModel;