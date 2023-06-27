const DatabaseOperation = require('./DatabaseOperations');

class DatabaseOperationsClient {

    static async getAllPanels(){
        const db = await DatabaseOperation.openDbConnection();
        const panels = await db.all("SELECT * FROM tbl_Panels");
        return panels;
    }

    static async getPanel(id){
        const db = await DatabaseOperation.openDbConnection();
        const panel = await db.get(`SELECT * FROM tbl_Panels WHERE Id = "${id}";`);
        return panel;
    }

    static async createPanel(panel){
        const db = await DatabaseOperation.openDbConnection();
        const query =`INSERT INTO tbl_Panels (Id, Name, Login, Password, Url, Credits, DatePaymentCredits, DateRegister, Observation, FK_Reseller )
            VALUES ( "${panel.Id}", "${panel.Name}", "${panel.Login}", "${panel.Password}", "${panel.Url}", ${panel.Credits}, "${new Date(panel.DatePaymentCredits)}", "${new Date(panel.DateRegister)}", "${panel.Observation}", "${panel.IdReseller}");`;
        const insert = await db.exec(query);
        return insert;

    }

    static async updateClient(panel) {
        const db = await DatabaseOperation.openDbConnection();

        const sql = `UPDATE tbl_Panels SET 
            Id = "${panel.Id}", 
            Name = "${panel.Name}", 
            Phone = "${panel.Login}", 
            Observation = "${panel.Password}", 
            Url = "${panel.Url}", 
            Credits = "${panel.Credits}", 
            DatePaymentCredits = "${panel.DatePaymentCredits}", 
            DatePaymentCredits = "${panel.DateRegister}", 
            Observation = "${panel.Observation}",
            FK_Reseller = "${panel.IdReseller}", 
            WHERE Id = ${panel.Id};`;

        const update = await db.exec(sql);
        return update;
    }

    static async deleteClient(Id) {
        const db = await DatabaseOperation.openDbConnection();
        const deleted = await db.exec(`DELETE FROM tbl_Panels WHERE Id = "${Id}"`);
        return deleted;
    }

}

module.exports = DatabaseOperationsClient;