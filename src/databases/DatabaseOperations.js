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
        await db.exec("CREATE TABLE IF NOT EXISTS tbl_User (\
                Id INTEGER PRIMARY KEY AUTOINCREMENT, \
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
        await db.exec("CREATE TABLE IF NOT EXISTS tbl_Clients (\
            Id INTEGER PRIMARY KEY AUTOINCREMENT, \
            Name VARCHAR(255) NOT NULL, \
            Phone VARCHAR(255) NOT NULL, \
            Observation VARCHAR(255) \
            )" 
        ); 
    }

    static async createTablePanel(){
        const db = await this.openDbConnection();
        await db.exec("CREATE TABLE IF NOT EXISTS tbl_Panel (\
            Id INTEGER PRIMARY KEY AUTOINCREMENT, \
            Name VARCHAR(255) NOT NULL, \
            Login VARCHAR(255) NOT NULL, \
            Password VARCHAR(255) NOT NULL, \
            Url VARCHAR(255) NOT NULL, \
            Credits INTEGER NOT NULL \
            )" 
        );
    }

    static async createTableReseller(){
        const db = await this.openDbConnection();
        await db.exec("CREATE TABLE IF NOT EXISTS tbl_Reseller (\
            Id INTEGER PRIMARY KEY AUTOINCREMENT, \
            Name VARCHAR(255) NOT NULL, \
            Phone VARCHAR(30) NOT NULL, \
            Email VARCHAR(255) NOT NULL, \
            Observation VARCHAR(255), \
            Credits INTEGER NOT NULL, \
            DatePaymentCredits DATETIME NOT NULL, \
            DateRegister DATETIME NOT NULL,\
            FK_Panel INTEGER NOT NULL \
            )" 
        );
    }

    static async createTableAccount(){
        const db = await this.openDbConnection();
        await db.exec("CREATE TABLE IF NOT EXISTS tbl_Account (\
            Id INTEGER PRIMARY KEY AUTOINCREMENT, \
            FK_Client INTEGER NOT NULL, \
            FK_Panel INTEGER NOT NULL, \
            FK_Reseller INTEGER NOT NULL, \
            Login VARCHAR(255) NOT NULL, \
            Password VARCHAR(255) NOT NULL, \
            StatusPayment VARCHAR(25), \
            StatusAccount VARCHAR(25), \
            DateMembership DATETIME NOT NULL, \
            DateRenovation DATETIME NOT NULL, \
            DateExpiration DATETIME NOT NULL, \
            FK_Plan INTEGER NOT NULL \
            )" 
        );
    }

    static async createTablePlan(){
        const db = await this.openDbConnection();
        await db.exec("CREATE TABLE IF NOT EXISTS tbl_Plan (\
            Id INTEGER PRIMARY KEY AUTOINCREMENT, \
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