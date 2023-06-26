const DatabaseOperationsAccount = require('../databases/sqlite/DataBaseOperationsAccount');
const DatabaseOperationsPgAccount = require('../databases/db_pg/DataBaseOperationsPgAccount');
const AccountModel = require('../model/AccountModel');

class AccountController{

    static async getAllAccounts(req, res){
        const acountsPg = await DatabaseOperationsPgAccount.getAllAccounts();
        const acounts = await DatabaseOperationsAccount.getAllAccounts();
        res.json({acounts: acountsPg});
    }

    static async getAccount(req, res){
        const { id } = req.body
        const accountPg = await DatabaseOperationsPgAccount.getAccount(id);
        const account = await DatabaseOperationsAccount.getAccount(id);
        res.json({account: accountPg});
    }

    static async registerAccount(req, res){
        const { accountDatas } = req;

        const existPg = await DatabaseOperationsPgAccount.getAccountIfExists(accountDatas.login, accountDatas.password);
        const exist = await DatabaseOperationsAccount.getAccountIfExists(accountDatas.login, accountDatas.password);
        console.log(exist, existPg)
     /*    if(existPg && existPg) {
            return res.json({ message: `${accountDatas.login} Registered.` });
        } */
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
            const registredPg = DatabaseOperationsPgAccount.createAccount(newAccount);            
            const registred = DatabaseOperationsAccount.createAccount(newAccount);            
            if(registredPg)
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

        const accountForUpdatePg = await DatabaseOperationsPgAccount.getAccount(id);
        const accountForUpdate = await DatabaseOperationsAccount.getAccount(id);

        if(accountForUpdatePg){
            accountForUpdatePg.Id = id; 
            accountForUpdatePg.IdClient = idClient;
            accountForUpdatePg.IdPanel = idPanel;
            accountForUpdatePg.IdPanel = idPlan; 
            accountForUpdatePg.Login = login; 
            accountForUpdatePg.Password = password;
            accountForUpdatePg.StatusPayment = statusPayment; 
            accountForUpdatePg.StatusAccount = statusAccount; 
            accountForUpdatePg.DateMembership = dateMembership; 
            accountForUpdatePg.DateRenovation = dateRenovation; 
            accountForUpdatePg.DateExpiration = dateExpiration;
            
            await DatabaseOperationsPgAccount.updateAccount(accountForUpdate);      
            await DatabaseOperationsAccount.updateAccount(accountForUpdate);      
            return res.status(201).json({});
        }

        return res.status(401).json({message: 'id not found'});
    }

    static async deleteAccount(req, res){
        const { id } = req.body;
        await DatabaseOperationsPgAccount.deleteAccount(id);
        await DatabaseOperationsAccount.deleteAccount(id);
        
        res.status(201).json({success: 'deleted'});
    }

}

module.exports =  AccountController;