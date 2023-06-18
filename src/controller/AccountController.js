const DatabaseOperationsAccount = require('../databases/sqlite/DataBaseOperationsAccount');
const AccountModel = require('../model/AccountModel');

class AccountController{

    static async getAllAccounts(req, res){
        const acounts = await DatabaseOperationsAccount.getAllAccounts();
        res.json({acounts: acounts});
    }

    static async getAccount(req, res){
        const { id } = req.body
        const account = await DatabaseOperationsAccount.getAccount(id);
        res.json({account: account});
    }

    static async registerAccount(req, res){
        const { accountDatas } = req;

        const exist = await DatabaseOperationsAccount.getAccountIfExists(accountDatas.login);
        if(exist) {
            return res.json({ message: `${accountDatas.login} Registered.` });
        }
        const newAccount = new AccountModel(
            accountDatas.idClient,
            accountDatas.idPanel,
            accountDatas.idPlan,
            accountDatas.idReseller,
            accountDatas.login,
            accountDatas.password,
            accountDatas.statusPayment,
            accountDatas.statusAccount,
            accountDatas.dateMembership,
            accountDatas.dateRenovation,
            accountDatas.dateExpiration,
        );
        try {
            const registred = DatabaseOperationsAccount.createAccount(newAccount);            
            if(registred)
                return res.status(201).json({message: 'Created'});   
            return res.status(400).json({message: 'Not Registered'});          
        } catch (error) {
            return res.status(400).json({error: error.message});
            }
    }

    static async updateAccount(req, res){
        const { 
                id, idClient , idPanel, idPlan, login, password, statusPayment, 
                statusAccount, dateMembership, dateRenovation, dateExpiration 
            } = req.body;

        const accountForUpdate = await DatabaseOperationsAccount.getAccount(id);

        if(accountForUpdate){
            accountForUpdate.Id = id; 
            accountForUpdate.IdClient = idClient;
            accountForUpdate.IdPanel = idPanel;
            accountForUpdate.IdPanel = idPlan; 
            accountForUpdate.Login = login; 
            accountForUpdate.Password = password;
            accountForUpdate.StatusPayment = statusPayment; 
            accountForUpdate.StatusAccount = statusAccount; 
            accountForUpdate.DateMembership = dateMembership; 
            accountForUpdate.DateRenovation = dateRenovation; 
            accountForUpdate.DateExpiration = dateExpiration;
            
            await DatabaseOperationsAccount.updateAccount(accountForUpdate);      
            return res.status(201).json({});
        }

        return res.status(401).json({message: 'id not found'});
    }

    static async deleteAccount(req, res){
        const { id } = req.body;
        const deleted = await DatabaseOperationsAccount.deleteAccount(id);
        
        res.status(201).json({success: 'deleted'});
    }

}

module.exports =  AccountController;