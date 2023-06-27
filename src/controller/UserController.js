const jwt = require('jsonwebtoken');
//const DataBaseOperationsUser = require('../databases/sqlite/DataBaseOperationsUser');
const DataBaseOperationPgUser = require('../databases/db_pg/DataBaseOperationPgUser');
const UserModel = require('../model/UserModel.js');
require('dotenv').config();

class UserController{

    static async getAllUser(req, res){
        const usersPg = await DataBaseOperationPgUser.getAllUser();
        //const users = await DataBaseOperationsUser.getAllUser();
        res.json({users: usersPg});
    }

    static async getUser(req, res){
        const { id } = req.body
        const userPg = await DataBaseOperationPgUser.getUser(id);
       // const user = await DataBaseOperationsUser.getUser(id);
        res.json({user: userPg});
    }

    static async registerUser(req, res){
        const {userDatas} = req;
        const newUser = new UserModel(userDatas.name, userDatas.phone, userDatas.type, userDatas.login, userDatas.password);
        
        try {
            const registredPg = DataBaseOperationPgUser.createUser(newUser)
            //const registred = DataBaseOperationsUser.createUser(newUser);
         
            if(registredPg){
                return res.status(201).json({message: 'Created'}); 
            }
            return res.status(400).json({message: 'Not Registered'});          
        } catch (error) {
           return res.status(400).json({error: error.message});
        }
    }

    static async updateUser(req, res){
        const {id, name, phone, type, login, password, key} = req.body;

        const userForUpdate = await DataBaseOperationPgUser.getUser(id);

        if(userForUpdate){
            userForUpdate.Id = id;
            userForUpdate.Name = name;
            userForUpdate.Phone = phone;
            userForUpdate.Type = type;  
            userForUpdate.Login = login; 
            userForUpdate.Password = password;
            userForUpdate.Key = key;
            
            //await DataBaseOperationsUser.updateUser(userForUpdate);    
            await DataBaseOperationPgUser.updateUser(userForUpdate);

            return res.status(201).json({});
        }

        return res.status(401).json({message: 'id not found'});
    }

    static async deleteUser(req, res){
        const { id } = req.body;
 
        await DataBaseOperationPgUser.deleteUser(id);
       // await DataBaseOperationsUser.deleteUser(id);
        
        res.status(201).json({success: 'deleted'});
    }

    static async loginUser(req, res){

        const { login, password, key } = req.body;
        const userPgLogin = await DataBaseOperationPgUser.loginUser(login, password, key);
        //const userLogin = await DataBaseOperationsUser.loginUser(login, password, key);

        if(userPgLogin.length > 0){
            const token = jwt.sign({
                id: userPgLogin.Id,
                type: userPgLogin.Type
            }, process.env.SECRET_KEY, { expiresIn: '1h' });
            
            return res.json({'token': token});
        }

        return res.status(403).json({message: 'User not logged'});
        
    }
}

module.exports =  UserController;