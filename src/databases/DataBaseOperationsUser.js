const DatabaseOperation = require('./DatabaseOperations');

class DatabaseOperationsUser {

    static async getAllUser(){
        const db = await DatabaseOperation.openDbConnection();
        const users = await db.all("SELECT * FROM tbl_User");
        return users;
    }

    static async getUser(id){
        const db = await DatabaseOperation.openDbConnection();
        const user = await db.get(`SELECT * FROM tbl_User WHERE Id = ${id};`);
        return user;
    }

    static async createUser(user){
        const db = await DatabaseOperation.openDbConnection();
        const query =`INSERT INTO tbl_User (Id, Name, Phone, Type, Login, Password, Key) 
            VALUES ( ${user.Id}, "${user.Name}", "${user.Phone}", ${user.Type}, "${user.Login}", "${user.Password}", "${user.Key}");`;
        const insert = await db.exec(query);
        return insert;

    }

    static async updateUser(user) {
        const db = await DatabaseOperation.openDbConnection();

        const sql = `UPDATE tbl_User SET 
             Id = ${user.Id}, 
             Name = "${user.Name}", 
             Phone = "${user.Phone}", 
             Type = ${user.Type}, 
             Login = "${user.Login}", 
             Password = "${user.Password}",  
             Key = "${user.Key}"
            WHERE Id = ${user.Id};`;

        const update = await db.exec(sql);
        return update;
    }

    static async deleteUser(Id) {
        const db = await DatabaseOperation.openDbConnection();
        const deleted = await db.exec(`DELETE FROM tbl_User WHERE Id = ${Id}`);
        return deleted;
    }

    static async loginUser(login, password, key) {
        const db = await DatabaseOperation.openDbConnection();
        const user = await db.get(`SELECT * FROM tbl_User WHERE Login = '${login}' AND Password = '${password}' AND Key = '${key}';`);
        return user;
    }
}

module.exports = DatabaseOperationsUser;