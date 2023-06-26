const {v4: uuidv4} = require('uuid');

class PlanModel{
    Id = uuidv4();  
    constructor(name, amount, period){
        this.Name = name;
        this.Amount = amount;
        this.Period = period;
    }
}

module.exports = PlanModel;