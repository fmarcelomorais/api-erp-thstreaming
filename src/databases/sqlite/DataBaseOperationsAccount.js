const DatabaseOperation = require('./DatabaseOperations');

class DatabaseOperationsAccount {

    static async getAllAccounts(){
        const db = await DatabaseOperation.openDbConnection();
        const resellers = await db.all("SELECT * FROM tbl_Account");
        return resellers;
    }

    static async getAccount(id){
        const db = await DatabaseOperation.openDbConnection();
        const clients = await db.get(`SELECT * FROM tbl_Account WHERE Id = ${id};`);
        return clients;
    }

    static async getAccountIfExists(login){
        const db = await DatabaseOperation.openDbConnection();
        const account = await db.get(`SELECT * FROM tbl_Account WHERE Login = "${login}";`);
        console.log(account);
        if(account){
            return true;
        }
        return false;
    }

    static async createAccount(account){
        const db = await DatabaseOperation.openDbConnection();
        console.log(account);
        const values = `${account.Id}, ${account.IdClient}, ${account.IdPanel}, ${account.IdPlan}, ${account.IdReseller},\
            "${account.Login}", "${account.Password}", "${account.StatusPayment}", "${account.StatusAccount}",\
            ${account.DateMembership}, ${account.DateRenovation}, ${account.DateExpiration} `
             
        const query =`INSERT INTO tbl_Account (Id, FK_Client, FK_Panel, FK_Plan, FK_Reseller, Login, Password, StatusPayment, StatusAccount, DateMembership, DateRenovation, DateExpiration ) 
            VALUES ( ${values} );`;
        const insert = await db.exec(query);
        return insert;

    }

    static async updateAccount(acoount) {
        const db = await DatabaseOperation.openDbConnection();

        const sql = `UPDATE tbl_Account SET 
            Id = ${acoount.Id}, 
            FK_Client = ${acoount.IdClient}, 
            FK_Panel = ${acoount.IdPanel}, 
            FK_Plan = ${acoount.IdPlan}, 
            FK_Reseller = ${acoount.IdReseeller}, 
            Login = ${acoount.Login}, 
            Password = ${acoount.Password}, 
            StatusPayment = ${acoount.StatusPayment}, 
            StatusAccount = ${acoount.StatusAccount}, 
            DateMembership = ${new Date(acoount.DateMembership)}, 
            DateRenovation = ${new Date(acoount.DateRenovation)}, 
            DateExpiration = ${new Date(acoount.DateExpiration)}
            WHERE Id = ${acoount.Id};`;

        const update = await db.exec(sql);
        return update;
    }

    static async deleteAccount(Id) {
        const db = await DatabaseOperation.openDbConnection();
        const deleted = await db.exec(`DELETE FROM tbl_Account WHERE Id = ${Id}`);
        return deleted;
    }

}

module.exports = DatabaseOperationsAccount;