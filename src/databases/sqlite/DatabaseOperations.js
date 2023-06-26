const  sqlite3 = require("sqlite3");
const { open } = require("sqlite");

class DatabaseOperation {
    
    static async openDbConnection(){
        return await open({
            filename: "./databasethstv.db",
            driver: sqlite3.Database
        });
    }

    static async createTableUser(){
        const db = await this.openDbConnection();
        await db.exec("CREATE TABLE IF NOT EXISTS tbl_users (\
                Id VARCHAR(255) NOT NULL, \
                Name VARCHAR(255) NOT NULL, \
                Phone VARCHAR(30) NOT NULL, \
                Type INTEGER NOT NULL, \
                Login VARCHAR(255) NOT NULL, \
                Password VARCHAR(255) NOT NULL, \
                Key VARCHAR(255) NOT NULL \
            )" 
        );
    }

    static async createTableClients(){
        const db = await this.openDbConnection();   
        await db.exec("CREATE TABLE IF NOT EXISTS tbl_clients (\
            Id VARCHAR(255) NOT NULL, \
            Name VARCHAR(255) NOT NULL, \
            Phone VARCHAR(255) NOT NULL, \
            Observation VARCHAR(255) \
            )" 
        ); 
    }

    static async createTablePanel(){
        const db = await this.openDbConnection();
        await db.exec("CREATE TABLE IF NOT EXISTS tbl_Panels (\
            Id VARCHAR(255) NOT NULL, \
            Name VARCHAR(255) NOT NULL, \
            Login VARCHAR(255) NOT NULL, \
            Password VARCHAR(255) NOT NULL, \
            Url VARCHAR(255) NOT NULL, \
            Credits INTEGER NOT NULL, \
            Observation VARCHAR(255) \
            )" 
        );
    }

    static async createTableReseller(){
        const db = await this.openDbConnection();
        await db.exec("CREATE TABLE IF NOT EXISTS tbl_Resellers (\
            Id VARCHAR(255) NOT NULL, \
            Name VARCHAR(255) NOT NULL, \
            Phone VARCHAR(30) NOT NULL, \
            Email VARCHAR(255) NOT NULL, \
            Observation VARCHAR(255), \
            Credits INTEGER NOT NULL, \
            DatePaymentCredits DATE NOT NULL, \
            DateRegister DATE NOT NULL,\
            FK_Panel VARCHAR(255) NOT NULL \
            )" 
        );
    }

    static async createTableAccount(){
        const db = await this.openDbConnection();
        await db.exec("CREATE TABLE IF NOT EXISTS tbl_Accounts (\
            Id VARCHAR(255) NOT NULL, \
            FK_Client VARCHAR(255) NOT NULL, \
            FK_Panel VARCHAR(255) NOT NULL, \
            FK_Reseller VARCHAR(255) NOT NULL, \
            Login VARCHAR(255) NOT NULL, \
            Password VARCHAR(255) NOT NULL, \
            StatusPayment VARCHAR(25), \
            StatusAccount VARCHAR(25), \
            DateMembership DATE NOT NULL, \
            DateRenovation DATE NOT NULL, \
            DateExpiration DATE NOT NULL, \
            FK_Plan VARCHAR(255) NOT NULL \
            )" 
        );
    }

    static async createTablePlan(){
        const db = await this.openDbConnection();
        await db.exec("CREATE TABLE IF NOT EXISTS tbl_Plans (\
            Id VARCHAR(255) NOT NULL, \
            Name VARCHAR(255) NOT NULL, \
            amount DECIMAL NOT NULL \
            )"
        );
    }

    static async alterTable(){
        const db = await this.openDbConnection();
        await db.exec("ALTER TABLE tbl_Teste2 ADD FOREING KEY (FK_Teste1) REFERENCES tbl_Teste1 (id)"
        );
    }
}

module.exports = DatabaseOperation;