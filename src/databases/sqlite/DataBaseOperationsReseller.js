const DatabaseOperation = require('./DatabaseOperations');

class DatabaseOperationsReseller {

    static async getAllResellers(){
        const db = await DatabaseOperation.openDbConnection();
        const resellers = await db.all("SELECT * FROM tbl_Reseller");
        return resellers;
    }

    static async getReseller(id){
        const db = await DatabaseOperation.openDbConnection();
        const clients = await db.get(`SELECT * FROM tbl_Reseller WHERE Id = ${id};`);
        return clients;
    }

    static async createReseller(reseller){
        const db = await DatabaseOperation.openDbConnection();
       
        const values = `${reseller.Id}, "${reseller.Name}", "${reseller.Phone}", "${reseller.Email}", "${reseller.Observation}",\
            ${reseller.Credits}, ${reseller.DatePaymentCredits}, ${reseller.DateRegister}, ${reseller.IdPanel} `
             
        const query =`INSERT INTO tbl_Reseller ( Id, Name, Phone, Email, Observation, Credits, DatePaymentCredits, DateRegister, FK_Panel) 
            VALUES ( ${values} );`;
        const insert = await db.exec(query);
        return insert;

    }

    static async updateClient(reseller) {
        const db = await DatabaseOperation.openDbConnection();

        const sql = `UPDATE tbl_Reseller SET 
            Id = ${reseller.Id}, 
            IdClient = ${reseller.IdClient}, 
            IdPanel = ${reseller.IdPanel}, 
            IdPlan = ${reseller.IdPlan}, 
            Login = ${reseller.Login}, 
            Password = ${reseller.Password}, 
            StatusPayment = ${reseller.StatusPayment}, 
            StatusAccount = ${reseller.StatusAccount}, 
            DateMembership = ${reseller.DateMembership}, 
            DateRenovation = ${reseller.DateRenovation}, 
            DateExpiration = ${reseller.DateExpiration}
            WHERE Id = ${reseller.Id};`;

        const update = await db.exec(sql);
        return update;
    }

    static async deleteReseller(Id) {
        const db = await DatabaseOperation.openDbConnection();
        const deleted = await db.exec(`DELETE FROM tbl_Reseller WHERE Id = ${Id}`);
        return deleted;
    }

}

module.exports = DatabaseOperationsReseller;