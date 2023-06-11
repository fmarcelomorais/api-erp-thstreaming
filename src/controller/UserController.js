const DataBaseOperationsUser = require('../database/DataBaseOperationsUser');
const UserModel = require('../model/UserModel.js');

class UserController{

    static async getAllUser(req, res){
        const users = await DataBaseOperationsUser.getAllUser();
        res.json({users: users});
    }

    static async getUser(req, res){
        const { id } = req.body
        const user = await DataBaseOperationsUser.getUser(id);
        res.json({user: user});
    }

    static async registerUser(req, res){
        const {userDates} = req;
        const newUser = new UserModel(userDates.name, userDates.phone, userDates.type, userDates.login, userDates.password);
        try {
            const registred = DataBaseOperationsUser.createUser(newUser);
         
            if(registred)
                return res.status(201).json({message: 'Created'});   
            return res.status(400).json({message: 'Not Registered'});          
        } catch (error) {
           return res.status(400).json({error: error.message});
        }
    }

    static async updateUser(req, res){
        const {id, name, phone, type, login, password, key} = req.body;

        const userForUpdate = await DataBaseOperationsUser.getUser(id);
        if(userForUpdate){
            userForUpdate.Name = name;
            userForUpdate.Phone = phone;
            userForUpdate.Type = type,  
            userForUpdate.Login = login,  
            userForUpdate.Password = password,
            userForUpdate.Key = key
            
            await DataBaseOperationsUser.updateUser(userForUpdate);      
            return res.status(201).json({});
        }

        return res.status(401).json({message: 'id not found'});
    }

    static async deleteUser(req, res){
        const {id} = req.body;
        const deleted = await DataBaseOperationsUser.deleteUser(id);
        
        res.status(201).json({success: 'deleted'});
    }
}

module.exports =  UserController;