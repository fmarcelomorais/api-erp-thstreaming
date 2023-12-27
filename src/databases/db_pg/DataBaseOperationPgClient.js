const DatabaseOperationPg = require('./DatabasesOperationPg');

class DataBaseOperationPgClient {

    static async getAllClients(){
        const db = await DatabaseOperationPg.openDbConnection();
        const clients = await db.query("SELECT * FROM tbl_clients");
        return clients.rows;
    }

    static async getClient(id){
        const db = await DatabaseOperationPg.openDbConnection();
        const client = await db.query(`SELECT * FROM tbl_clients WHERE id=$1;`,[id])
        return client.rows;
    }

    static async createClient(client){
        const db = await DatabaseOperationPg.openDbConnection();
        const query =`INSERT INTO tbl_clients (id, name, phone, observation) 
            VALUES ( $1, $2, $3, $4);`;
        const values = [client.Id, client.Name, client.Phone, client.Observation];
        const insert = await db.query(query, values);
        return insert;
    
    }

    static async updateClient(client) {
       
        const db = await DatabaseOperationPg.openDbConnection();

        const sql = `UPDATE tbl_clients SET id=$1, name=$2, phone=$3, observation=$4 WHERE id=$5;`;
        const values = [client.Id, client.Name, client.Phone, client.Observation, client.Id]
        const update = await db.query(sql, values);
        return update;
    }

    static async deleteClient(id) {
   
        const db = await DatabaseOperationPg.openDbConnection();
        const deleted = await db.query(`DELETE FROM tbl_clients WHERE id=$1;`, [id]);
        return deleted;
    }

}

module.exports = DataBaseOperationPgClient;