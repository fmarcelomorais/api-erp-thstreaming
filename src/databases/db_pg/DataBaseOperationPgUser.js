const DatabaseOperationPg = require('./DatabasesOperationPg');

class DatabaseOperationsPgUser {

    static async getAllUser(){
        const db = await DatabaseOperationPg.openDbConnection();
        const users = await db.query("SELECT * FROM tbl_users");
        return users.rows;
    }

    static async getUser(id){
        const db = await DatabaseOperationPg.openDbConnection();
        const user = await db.query(`SELECT * FROM tbl_users WHERE id = '${id}';`);
        return user.rows;
    }

    static async createUser(user){
        const db = await DatabaseOperationPg.openDbConnection();
        const query =`INSERT INTO tbl_users (id, name, phone, type, login, password, key) 
            VALUES ( $1, $2, $3, $4, $5, $6, $7);`;
        const values = [user.Id, user.Name, user.Phone, user.Type, user.Login, user.Password, user.Key]
        const insert = await db.query(query, values);
        return insert;
    
    }

    static async updateUser(user) {

        const db = await DatabaseOperationPg.openDbConnection();

        const sql = `UPDATE tbl_users SET id=$1, name=$2, phone=$3, type=$4, login=$5, password=$6, key=$7 WHERE id=$8;`;
        const values = [user.Id, user.Name, user.Phone, user.Type, user.Login, user.Password, user.Key, user.Id]
        const update = await db.query(sql, values);
        return update;
    }

    static async deleteUser(id) {
   
        const db = await DatabaseOperationPg.openDbConnection();
        const deleted = await db.query(`DELETE FROM tbl_users WHERE id=$1;`, [id]);
        return deleted;
    }

    static async loginUser(login, password, key) {
        const db = await DatabaseOperationPg.openDbConnection();
        const user = await db.query(`SELECT * FROM tbl_users WHERE Login=$1 AND Password=$2 AND Key=$3;`, [login, password, key]);
        return user.rows;
    }
}

module.exports = DatabaseOperationsPgUser;