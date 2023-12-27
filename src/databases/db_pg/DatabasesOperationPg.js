const { Pool } = require('pg');
require('dotenv').config();

class DatabasesOperationPg {

    static async openDbConnection(){
        const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
        const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`;
        const pool = new Pool({
            connectionString: URL, 
            ssl: require
        });
        //const result = await sql`select version()`;
        
        return  pool

    }

    static async createTableUser(){
        const db = await this.openDbConnection();
        await db.query("CREATE TABLE IF NOT EXISTS tbl_Users (\
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
        await db.query("CREATE TABLE IF NOT EXISTS tbl_Clients (\
            Id VARCHAR(255) NOT NULL, \
            Name VARCHAR(255) NOT NULL, \
            Phone VARCHAR(255) NOT NULL, \
            Observation VARCHAR(255) \
            )" 
        ); 
    }

    static async createTablePanel(){
        const db = await this.openDbConnection();
        await db.query("CREATE TABLE IF NOT EXISTS tbl_Panels (\
            Id VARCHAR(255) NOT NULL, \
            Name VARCHAR(255) NOT NULL, \
            Login VARCHAR(255) NOT NULL, \
            Password VARCHAR(255) NOT NULL, \
            Url VARCHAR(255) NOT NULL, \
            Credits INTEGER NOT NULL, \
            DatePaymentCredits DATE NOT NULL, \
            DateRegister DATE NOT NULL,\
            Observation VARCHAR(255)\
            )" 
        );
    }

    static async createTableReseller(){
        const db = await this.openDbConnection();
        await db.query("CREATE TABLE IF NOT EXISTS tbl_Resellers (\
            Id VARCHAR(255) NOT NULL, \
            Name VARCHAR(255) NOT NULL, \
            Phone VARCHAR(30) NOT NULL, \
            Email VARCHAR(255) NOT NULL, \
            Observation VARCHAR(255),\
            Id_Panel VARCHAR(255) \
            )" 
        );
    }

    static async createTableAccount(){
        const db = await this.openDbConnection();
        await db.query("CREATE TABLE IF NOT EXISTS tbl_Accounts (\
            Id VARCHAR(255) NOT NULL, \
            FK_Client VARCHAR(255) NOT NULL, \
            FK_Panel VARCHAR(255) NOT NULL, \
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
        await db.query("CREATE TABLE IF NOT EXISTS tbl_Plans (\
            Id VARCHAR(255) NOT NULL, \
            Name VARCHAR(255) NOT NULL, \
            amount DECIMAL NOT NULL \
            )"
        );
    }

    static async alterTable(){
        const db = await this.openDbConnection();
        await db.query("ALTER TABLE tbl_Teste2 ADD FOREING KEY (FK_Teste1) REFERENCES tbl_Teste1 (id)" );
    }

    static async redoTables(force){
        const db = await this.openDbConnection();
        
        const arrDeleteRows = [
            "DELETE FROM tbl_users WHERE type > 1", 
            "DELETE FROM tbl_clients;", 
            "DELETE FROM tbl_panels;", 
            "DELETE FROM tbl_accounts;", 
            "DELETE FROM tbl_resellers;", 
            "DELETE FROM tbl_plans;" 
        ]
     
        const arrDropTables = [
            //"DROP TABLE tbl_users", 
            "DROP TABLE tbl_clients", 
            "DROP TABLE tbl_panels", 
            "DROP TABLE tbl_accounts", 
            "DROP TABLE tbl_resellers", 
            "DROP TABLE tbl_plans" 
        ]
        for(let i = 0; i < arrDeleteRows.length; i++){
            if(force){
                await db.query(arrDropTables[i]);
            }else{
                await db.query(arrDeleteRows[i]);
            }
        }
    }
}

module.exports = DatabasesOperationPg;