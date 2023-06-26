const {v4: uuidv4} = require('uuid');

class UserModel{
        Id = uuidv4();
        Key = "12331388";
    constructor(name, phone, type, login, password){
        this.Name = name;
        this.Phone = phone;
        this.Type = type; // 1 - Master - 2 - Pro - 3 - Tester
        this.Login = login;
        this.Password = password;
    }
}

module.exports = UserModel;