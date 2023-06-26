const DatabaseOperation = require('./DatabaseOperations');

class DatabaseOperationsReseller {

    static async getAllResellers(){
        const db = await DatabaseOperation.openDbConnection();
        const resellers = await db.all("SELECT * FROM tbl_Resellers");
        return resellers;
    }

    static async getReseller(id){
        const db = await DatabaseOperation.openDbConnection();
        const clients = await db.get(`SELECT * FROM tbl_Resellers WHERE Id = "${id}";`);
        return clients;
    }

    static async createReseller(reseller){
        const db = await DatabaseOperation.openDbConnection();
       
        const values = `"${reseller.Id}", "${reseller.Name}", "${reseller.Phone}", "${reseller.Email}", "${reseller.Observation}",\
            ${reseller.Credits}, ${reseller.DatePaymentCredits}, ${reseller.DateRegister}, "${reseller.IdPanel}" `
             
        const query =`INSERT INTO tbl_Resellers ( Id, Name, Phone, Email, Observation, Credits, DatePaymentCredits, DateRegister, FK_Panel) 
            VALUES ( ${values} );`;
        const insert = await db.exec(query);
        return insert;

    }

    static async updateReseller(reseller) {
        const db = await DatabaseOperation.openDbConnection();

        const sql = `UPDATE tbl_Resellers SET 
            Id = "${reseller.Id}", 
            Name = "${reseller.Name}", 
            Phone = "${reseller.Phone}", 
            Email = "${reseller.Email}", 
            Observation = "${reseller.Observation}", 
            Credits = ${reseller.Credits}, 
            DatePaymentCredits = "${this.dateFormat(reseller.DatePaymentCredits)}", 
            DateRegister = "${this.dateFormat(reseller.DateRegister)}", 
            FK_Panel = "${reseller.IdPanel}"
            WHERE Id = "${reseller.Id}";`;

        const update = await db.exec(sql);
        return update;
    }

    static async deleteReseller(Id) {
        const db = await DatabaseOperation.openDbConnection();
        const deleted = await db.exec(`DELETE FROM tbl_Resellers WHERE Id = "${Id}"`);
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

module.exports = DatabaseOperationsReseller;