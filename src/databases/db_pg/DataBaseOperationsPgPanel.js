const DatabaseOperationPg = require('./DatabasesOperationPg');

class DatabaseOperationPgPanel {

    static async getAllPanels(){
        const db = await DatabaseOperationPg.openDbConnection();
        const panels = await db.query("SELECT * FROM tbl_Panels");
        return panels.rows;
    }

    static async getPanel(id){
        const db = await DatabaseOperationPg.openDbConnection();
        const panel = await db.query(`SELECT * FROM tbl_Panels WHERE Id=$1;`, [id]);
        return panel.rows;
    }

    static async createPanel(panel){
        console.log(panel);
        const db = await DatabaseOperationPg.openDbConnection();
        const query =`INSERT INTO tbl_Panels (Id, Name, Login, Password, Url, Credits, Observation, DateRegister, DatePaymentCredits ) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9 );`;
        const values = [panel.Id, panel.Name, panel.Login, panel.Password, panel.Url, panel.Credits, panel.Observation, panel.DateRegister, panel.DatePaymentCredits];
        const insert = await db.query(query, values);
        return insert;

    }

    static async updatePanel(panel) {
        const db = await DatabaseOperationPg.openDbConnection();

        const sql = `UPDATE tbl_Panels SET Id=$1, Name=$2, Login=$3, Password=$4, Url=$5, Credits=$6, DatePaymentCredits=$7, DateRegister=$8, Observation=$9, FK_Reseller=$10 WHERE Id=$11;`;
        const values = [panel.Id, panel.Name, panel.Login, panel.Password, panel.Url, panel.Credits, panel.Observation, panel.DateRegister, panel.DatePaymentCredits, panel.FK_Reseller, panel.Id];   
        const update = await db.query(sql, values);
        return update;
    }

    static async deletePanel(id) {
        const db = await DatabaseOperationPg.openDbConnection();
        await db.query(`DELETE FROM tbl_Panels WHERE Id=$1`,[id]);
        return deleted;
    }

}

module.exports = DatabaseOperationPgPanel;