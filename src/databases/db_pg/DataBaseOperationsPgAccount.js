const DatabaseOperationPg = require('./DatabasesOperationPg');

class DatabaseOperationsPgAccount {

    static async getAllAccounts(){
        const db = await DatabaseOperationPg.openDbConnection();
        const sql = `SELECT conta.id, conta.fk_client, conta.fk_panel, conta.fk_plan,
        conta.login as loginConta, conta.password as senhaConta, conta.statusPayment, conta.statusAccount, conta.DateMembership, conta.DateRenovation, conta.DateExpiration,
        cliente.name, cliente.phone, cliente.observation,
        painel.name as nomePainel, painel.login as loginPainel, painel.password as senhaPainel, painel.url, painel.credits, painel.DatePaymentCredits, painel.DateRegister,
        plano.name as nomePlano, plano.amount 
        FROM tbl_accounts as conta
        INNER JOIN tbl_clients as cliente on (conta.fk_client = cliente.id)
        INNER JOIN tbl_panels as painel on (conta.fk_panel = painel.id) 
        INNER JOIN tbl_plans as plano on (conta.fk_plan = plano.id);       
        `
        const resellers = await db.query(sql);
        return resellers.rows;
    }

    static async getAccount(id){
        const db = await DatabaseOperationPg.openDbConnection();
        const sql = `SELECT conta.id, conta.fk_client, conta.fk_panel, conta.fk_plan,
        conta.login as loginConta, conta.password as senhaConta, conta.statusPayment, conta.statusAccount, conta.DateMembership, conta.DateRenovation, conta.DateExpiration,
        cliente.name, cliente.phone, cliente.observation,
        painel.name as nomePainel, painel.login as loginPainel, painel.password as senhaPainel, painel.url, painel.credits, painel.DatePaymentCredits, painel.DateRegister,
        plano.name as nomePlano, plano.amount 
        FROM tbl_accounts as conta
        INNER JOIN tbl_clients as cliente on (conta.fk_client = cliente.id)
        INNER JOIN tbl_panels as painel on (conta.fk_panel = painel.id) 
        INNER JOIN tbl_plans as plano on (conta.fk_plan = plano.id)
        WHERE conta.Id = $1;       
        `
        const account = await db.query(sql, [id]);
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
        const query =`INSERT INTO tbl_Accounts (Id, FK_Client, FK_Panel, FK_Plan, Login, Password, StatusPayment, StatusAccount, DateMembership, DateRenovation, DateExpiration ) 
        VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11 );`;
        const values = [account.Id, account.IdClient, account.IdPanel, account.IdPlan, account.Login, account.Password, account.StatusPayment, account.StatusAccount, account.DateMembership, account.DateRenovation, account.DateExpiration]     
        const insert = await db.query(query, values);
        return insert;

    }

    static async updateAccount(account) {
        const db = await DatabaseOperationPg.openDbConnection();

        const sql = `UPDATE tbl_Accounts SET Id=$1, FK_Client=$2, FK_Panel=$3, FK_Plan=$4, Login=$5, Password=$6,
            StatusPayment=$7, StatusAccount=$8, DateMembership=$9, DateRenovation=$10, DateExpiration=$11 WHERE Id=$12;`;
        const values = [account.Id, account.IdClient, account.IdPanel, account.IdPlan, account.Login, account.Password, account.StatusPayment, account.StatusAccount, account.DateMembership, account.DateRenovation, account.DateExpiration, account.Id]     
        const update = await db.query(sql, values);
       
        return update;
    }

    static async deleteAccount(id) {
        const db = await DatabaseOperationPg.openDbConnection();
        const deleted = await db.query(`DELETE FROM tbl_Accounts WHERE Id=$1`, [id]);
        return deleted;
    }

}

module.exports = DatabaseOperationsPgAccount;