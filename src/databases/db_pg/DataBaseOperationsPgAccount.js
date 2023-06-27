const DatabaseOperationPg = require('./DatabasesOperationPg');

class DatabaseOperationsPgAccount {

    static async getAllAccounts(){
        const db = await DatabaseOperationPg.openDbConnection();
        const resellers = await db.query("SELECT * FROM tbl_Accounts");
        return resellers.rows;
    }

    static async getAccount(id){
        const db = await DatabaseOperationPg.openDbConnection();
        const account = await db.query(`SELECT * FROM tbl_Account WHERE Id = $1;`, [1]);
        return account.rows;
    }

    static async getAccountIfExists(login, password){
        const db = await DatabaseOperationPg.openDbConnection();
        const account = await db.query(`SELECT * FROM tbl_Accounts WHERE Login=$1 AND Password=$2;`, [login, password]);

        if(account.rows.length > 0) {
            return true;
        }
        return false;
    }

    static async createAccount(account){
        const db = await DatabaseOperationPg.openDbConnection();
        const query =`INSERT INTO tbl_Accounts (Id, FK_Client, FK_Panel, FK_Plan, FK_Reseller, Login, Password, StatusPayment, StatusAccount, DateMembership, DateRenovation, DateExpiration ) 
        VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12 );`;
        const values = [account.Id, account.IdClient, account.IdPanel, account.IdPlan, account.IdReseller, account.Login, account.Password, account.StatusPayment, account.StatusAccount, account.DateMembership, account.DateRenovation, account.DateExpiration]     
        const insert = await db.query(query, values);
        return insert;

    }

    static async updateAccount(account) {
        const db = await DatabaseOperationPg.openDbConnection();

        const sql = `UPDATE tbl_Accounts SET Id=$1, FK_Client=$2, FK_Panel=$3, FK_Plan=$4, FK_Reseller=$5, Login=$6, Password=$7,
            StatusPayment=$8, StatusAccount=$9, DateMembership=$10, DateRenovation=$11, DateExpiration=$12 WHERE Id=$13;`;
        const values = [account.Id, account.IdClient, account.IdPanel, account.IdPlan, account.IdReseller, account.Login, account.Password, account.StatusPayment, account.StatusAccount, account.DateMembership, account.DateRenovation, account.DateExpiration, account.Id]     
        const update = await db.query(sql, values);
        return update;
    }

    static async deleteAccount(id) {
        const db = await DatabaseOperationPg.openDbConnection();
        const deleted = await db.exec(`DELETE FROM tbl_Accounts WHERE Id=$1`, [id]);
        return deleted;
    }

}

module.exports = DatabaseOperationsPgAccount;