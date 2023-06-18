
class AccountModel{
       Id = null; 
    constructor(idClient , idPanel, idPlan, idReseller, login, password, statusPayment, statusAccount, dateMembership, dateRenovation, dateExpiration){
        this.IdClient = idClient;
        this.IdPanel = idPanel;
        this.IdPlan = idPlan;
        this.IdReseller = idReseller;
        this.Login = login;
        this.Password = password;
        this.StatusPayment = statusPayment;
        this.StatusAccount = statusAccount;
        this.DateMembership = dateMembership;
        this.DateRenovation = dateRenovation;
        this.DateExpiration = dateExpiration;
    }
}

module.exports = AccountModel;
