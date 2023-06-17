const DatabaseOperation = require('./DatabaseOperations');

class DatabaseOperationsClient {

    static async getAllPanels(){
        const db = await DatabaseOperation.openDbConnection();
        const panels = await db.all("SELECT * FROM tbl_Panel");
        return panels;
    }

    static async getPanel(id){
        const db = await DatabaseOperation.openDbConnection();
        const panel = await db.get(`SELECT * FROM tbl_Panel WHERE Id = ${id};`);
        return panel;
    }

    static async createPanel(panel){
        const db = await DatabaseOperation.openDbConnection();
        const query =`INSERT INTO tbl_Panel (Id, Name, Login, Password, Url, Credits, Observation ) 
            VALUES ( ${panel.Id}, "${panel.Name}", "${panel.Login}", "${panel.Password}", "${panel.Url}", ${panel.Credits}, "${panel.Observation}" );`;
        const insert = await db.exec(query);
        return insert;

    }

    static async updateClient(panel) {
        const db = await DatabaseOperation.openDbConnection();

        const sql = `UPDATE tbl_Panel SET 
            Id = ${panel.Id}, 
            Name = "${panel.Name}", 
            Phone = "${panel.Login}", 
            Observation = "${panel.Password}", 
            Url = "${panel.Url}", 
            Credits = "${panel.Credits}", 
            Observation = "${panel.Observation}"
            WHERE Id = ${panel.Id};`;

        const update = await db.exec(sql);
        return update;
    }

    static async deleteClient(Id) {
        const db = await DatabaseOperation.openDbConnection();
        const deleted = await db.exec(`DELETE FROM tbl_Panel WHERE Id = ${Id}`);
        return deleted;
    }

}

module.exports = DatabaseOperationsClient;