const DatabaseOperation = require('./DatabaseOperations');

class DatabaseOperationsClient {

    static async getAllClients(){
        const db = await DatabaseOperation.openDbConnection();
        const clients = await db.all("SELECT * FROM tbl_Clients");
        return clients;
    }

    static async getClient(id){
        const db = await DatabaseOperation.openDbConnection();
        const clients = await db.get(`SELECT * FROM tbl_Clients WHERE Id = ${id};`);
        return clients;
    }

    static async createClient(client){
        const db = await DatabaseOperation.openDbConnection();
        const query =`INSERT INTO tbl_Clients (Id, Name, Phone, Observation ) 
            VALUES ( "${client.Id}", "${client.Name}", "${client.Phone}", "${client.Observation}");`;
        const insert = await db.exec(query);
        return insert;

    }

    static async updateClient(client) {
        const db = await DatabaseOperation.openDbConnection();

        const sql = `UPDATE tbl_Clients SET 
            Id = ${client.Id}, 
            Name = "${client.Name}", 
            Phone = "${client.Phone}", 
            Observation = "${client.Observation}"
            WHERE Id = ${client.Id};`;

        const update = await db.exec(sql);
        return update;
    }

    static async deleteClient(Id) {
        const db = await DatabaseOperation.openDbConnection();
        const deleted = await db.exec(`DELETE FROM tbl_Clients WHERE Id = ${Id}`);
        return deleted;
    }

}

module.exports = DatabaseOperationsClient;