
class PanelModel{
        Id = null;  
    constructor(name, login, password,  url, credits, observation){
        this.Name = name;
        this.Login = login;
        this.Password = password;
        this.Url = url;
        this.Credits = credits;
        this.Observation = observation;
    }
}

module.exports = PanelModel;