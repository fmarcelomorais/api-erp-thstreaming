
class ResellerModel{
       Id = null; 
    constructor(name , phone, email, observation, credits, datePaymentCredits, dateRegister, idPanel){
        this.Name = name;
        this.Phone = phone;
        this.Email = email;
        this.Observation = observation;
        this.Credits = credits;
        this.DatePaymentCredits = datePaymentCredits;
        this.DateRegister = dateRegister;
        this.IdPanel = idPanel
    }
}

module.exports = ResellerModel;
