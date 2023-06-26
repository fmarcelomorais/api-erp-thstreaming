const DatabaseOperationPg = require('./DatabasesOperationPg');

class DatabaseOperationPgPanel {

    static async getAllPanels(){
        const db = await DatabaseOperationPg.openDbConnection();
        const panels = await db.query("SELECT * FROM tbl_Panels");
        return panels.rows;
    }

    static async getPanel(id){
        const db = await DatabaseOperationPg.openDbConnection();
        const panel = await db.query(`SELECT * FROM tbl_Panels WHERE Id =$1;`, [id]);
        return panel.rows;
    }

    static async createPanel(panel){
        const db = await DatabaseOperationPg.openDbConnection();
        const query =`INSERT INTO tbl_Panels (Id, Name, Login, Password, Url, Credits, Observation ) VALUES ( $1, $2, $3, $4, $5, $6, $7 );`;
        const values = [panel.Id, panel.Name, panel.Login, panel.Password, panel.Url, panel.Credits, panel.Observation];
        const insert = await db.query(query, values);
        return insert;

    }

    static async updateClient(panel) {
        const db = await DatabaseOperationPg.openDbConnection();

        const sql = `UPDATE tbl_Panels SET Id=$1, Name=$2, Login=$3, Password=$4, Url=$5, Credits=$6, Observation=$7 WHERE Id=$8;`;
        const values = [panel.Id, panel.Name, panel.Login, panel.Password, panel.Url, panel.Credits, panel.Observation, panel.Id];    
        const update = await db.query(sql, values);
        return update;
    }

    static async deleteClient(id) {
        const db = await DatabaseOperationPg.openDbConnection();
        await db.query(`DELETE FROM tbl_Panels WHERE Id=$1`,[id]);
        return deleted;
    }

}

module.exports = DatabaseOperationPgPanel;