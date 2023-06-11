
export default class ResellerModel{
        
    constructor(idClient , idPanel, idPlan, login, password, statusPayment, statusAccount, dateMembership, dateRenovation, dateExpiration){
        this.IdClient = idClient;
        this.IdPanel = idPanel;
        this.IdPlan = idPlan;
        this.Login = login;
        this.Password = password;
        this.StatusPayment = statusPayment;
        this.StatusAccount = statusAccount;
        this.DateMembership = dateMembership;
        this.DateRenovation = dateRenovation;
        this.DateExpiration = dateExpiration;
    }
}
