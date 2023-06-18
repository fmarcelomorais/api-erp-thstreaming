const DatabaseOperationsClient = require('../databases/sqlite/DataBaseOperationsClient');
const ClientModel = require('../model/ClientModel.js');

class ClientController{

    static async getAllClients(req, res){
        const clients = await DatabaseOperationsClient.getAllClients();
        res.json({clients: clients});
    }

    static async getClient(req, res){
        const { id } = req.body
        const client = await DatabaseOperationsClient.getClient(id);
        res.json({client: client});
    }

    static async registerClient(req, res){
        const {clientDatas} = req;
        const newClient = new ClientModel(clientDatas.name, clientDatas.phone, clientDatas.observation);
        try {
            const registred = DatabaseOperationsClient.createClient(newClient);
         
            if(registred)
                return res.status(201).json({message: 'Created'});   
            return res.status(400).json({message: 'Not Registered'});          
        } catch (error) {
           return res.status(400).json({error: error.message});
        }
    }

    static async updateClient(req, res){
        const {id, name, observation} = req.body;

        const userForUpdate = await DatabaseOperationsClient.updateClient(id);

        if(userForUpdate){
            userForUpdate.Name = name;
            userForUpdate.Phone = phone;
            userForUpdate.Observation = observation,  
            
            await DatabaseOperationsClient.updateClient(userForUpdate);      
            return res.status(201).json({});
        }

        return res.status(401).json({message: 'id not found'});
    }

    static async deleteClient(req, res){
        const { id } = req.body;
        const deleted = await DatabaseOperationsClient.deleteClient(id);
        
        res.status(201).json({success: 'deleted'});
    }

}

module.exports =  ClientController;