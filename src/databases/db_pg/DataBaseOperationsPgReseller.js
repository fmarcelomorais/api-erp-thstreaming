const DatabaseOperationPg = require('./DatabasesOperationPg');

class DatabaseOperationsPgReseller {

    static async getAllResellers(){
        const db = await DatabaseOperationPg.openDbConnection();
        const resellers = await db.query("SELECT * FROM tbl_resellers");
        return resellers.rows;
    }

    static async getReseller(id){
        const db = await DatabaseOperationPg.openDbConnection();
        const reseller = await db.query(`SELECT * FROM tbl_resellers WHERE Id=$1;`,[id]);
        return reseller.rows;
    }

    static async createReseller(reseller){
        const db = await DatabaseOperationPg.openDbConnection();       
        
        const query =`INSERT INTO tbl_resellers ( Id, Name, Phone, Email, Observation, Id_Panel) 
        VALUES ( $1, $2, $3, $4, $5, $6 );`;
        const values = [reseller.Id, reseller.Name, reseller.Phone, reseller.Email, reseller.Observation, reseller.Id_Panel ]
        const insert = await db.query(query, values);
        return insert;

    }

    static async updateReseller(reseller) {
        const db = await DatabaseOperationPg.openDbConnection();
        const sql = `UPDATE tbl_resellers SET Id=$1, Name=$2, Phone=$3, Email=$4, Observation=$5, Id_Panel=$6 WHERE Id=$7;`;
        const values = [ reseller.Id, reseller.Name, reseller.Phone, reseller.Email, reseller.Observation, reseller.Id_Panel, reseller.Id ];
        const update = await db.query(sql, values);
        return update;
    }

    static async deleteReseller(id) {
        const db = await DatabaseOperationPg.openDbConnection();
        const deleted = await db.query(`DELETE FROM tbl_resellers WHERE Id=$1`, [id]);
        return deleted;
    }

}

module.exports = DatabaseOperationsPgReseller;