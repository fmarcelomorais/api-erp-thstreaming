const jwt = require('jsonwebtoken');
require('dotenv').config();
const DataBaseOperationsUser = require('../databases/sqlite/DataBaseOperationsUser');
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
        const {userDatas} = req;
        const newUser = new UserModel(userDatas.name, userDatas.phone, userDatas.type, userDatas.login, userDatas.password);
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
        const { id } = req.body;
        const deleted = await DataBaseOperationsUser.deleteUser(id);
        
        res.status(201).json({success: 'deleted'});
    }

    static async loginUser(req, res){

        const { login, password, key } = req.body;
        const userLogin = await DataBaseOperationsUser.loginUser(login, password, key);
        const token = jwt.sign({
            id: userLogin.Id,
            type: userLogin.Type
        }, process.env.SECRET_KEY, { expiresIn: '1h' });
        
        return res.json({'token': token});
        
    }
}

module.exports =  UserController;