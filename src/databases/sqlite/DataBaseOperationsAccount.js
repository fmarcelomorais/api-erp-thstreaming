const DatabaseOperation = require('./DatabaseOperations');

class DatabaseOperationsAccount {

    static async getAllAccounts(){
        const db = await DatabaseOperation.openDbConnection();
        const accounts = await db.all("SELECT * FROM tbl_Accounts");
        return accounts;
    }

    static async getAccount(id){
        const db = await DatabaseOperation.openDbConnection();
        const account = await db.get(`SELECT * FROM tbl_Accounts WHERE Id = "${id}";`);
        return account;
    }

    static async getAccountIfExists(login, password){
        const db = await DatabaseOperation.openDbConnection();
        const account = await db.get(`SELECT * FROM tbl_Accounts WHERE Login = "${login} AND Password = ${password}";`);
   
        if(!!account) {
            return true;
        }
        return false;
    }

    static async createAccount(account){
        const db = await DatabaseOperation.openDbConnection();

        const values = `"${account.Id}", "${account.IdClient}", "${account.IdPanel}", "${account.IdPlan}", "${account.IdReseller}",
            "${account.Login}", "${account.Password}", "${account.StatusPayment}", "${account.StatusAccount}",
            "${this.dateFormat(account.DateMembership)}", "${this.dateFormat(account.DateRenovation)}", "${this.dateFormat(account.DateExpiration)}" `     
        const query =`INSERT INTO tbl_Accounts (Id, FK_Client, FK_Panel, FK_Plan, FK_Reseller, Login, Password, StatusPayment, StatusAccount, DateMembership, DateRenovation, DateExpiration ) 
            VALUES ( ${values} );`;
        const insert = await db.exec(query);
        return insert;

    }

    static async updateAccount(account) {
        const db = await DatabaseOperation.openDbConnection();

        const sql = `UPDATE tbl_Accounts SET 
            Id = "${account.Id}", 
            FK_Client = "${account.IdClient}", 
            FK_Panel = "${account.IdPanel}", 
            FK_Plan = "${account.IdPlan}", 
            FK_Reseller = "${account.IdReseeller}", 
            Login = "${account.Login}", 
            Password = "${account.Password}", 
            StatusPayment = "${account.StatusPayment}", // 01 - Pago | 02 - Pendente | 03 - Devendo
            StatusAccount = "${account.StatusAccount}", // 01 - Ativo | 02 - Bloqueado | 03 - Cancelado
            DateMembership = "${new Date(account.DateMembership)}", 
            DateRenovation = "${new Date(account.DateRenovation)}", 
            DateExpiration = "${new Date(account.DateExpiration)}"
            WHERE Id = "${account.Id}";`;

        const update = await db.exec(sql);
        return update;
    }

    static async deleteAccount(Id) {
        const db = await DatabaseOperation.openDbConnection();
        const deleted = await db.exec(`DELETE FROM tbl_Accounts WHERE Id = "${Id}"`);
        return deleted;
    }

    static dateFormat(date){
        const dateForFormat = new Date(date)
        const day = dateForFormat.getDate();
        const mounth = dateForFormat.getMonth();
        const year = dateForFormat.getFullYear();
        const dateFormated = new Date(year, mounth, day)
        return dateFormated
    }

}

module.exports = DatabaseOperationsAccount;