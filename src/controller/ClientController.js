const DataBaseOperationPgClient = require('../databases/db_pg/DataBaseOperationPgClient');
//const DatabaseOperationsClient = require('../databases/sqlite/DataBaseOperationsClient');
const ClientModel = require('../model/ClientModel.js');

class ClientController{

    static async getAllClients(req, res){
        const clientsPg = await DataBaseOperationPgClient.getAllClients();
       // const clients = await DatabaseOperationsClient.getAllClients();
        res.json({clients: clientsPg});
    }

    static async getClient(req, res){
        const { id } = req.body
        const clientPg = await DataBaseOperationPgClient.getClient(id);
       // const client = await DatabaseOperationsClient.getClient(id);
        res.json({client: clientPg});
    }

    static async registerClient(req, res){
        const {clientDatas} = req;
        const newClient = new ClientModel(clientDatas.name, clientDatas.phone, clientDatas.observation);
        try {
            const registredPg = DataBaseOperationPgClient.createClient(newClient);
           // const registred = DatabaseOperationsClient.createClient(newClient);
         
            if(registredPg)
                return res.status(201).json({message: 'Created'});   
            return res.status(400).json({message: 'Not Registered'});          
        } catch (error) {
           return res.status(400).json({error: error.message});
        }
    }

    static async updateClient(req, res){
        const {id, name, observation} = req.body;

        const userForUpdatePg = await DataBaseOperationPgClient.updateClient(id);
       // const userForUpdate = await DatabaseOperationsClient.updateClient(id);

        if(userForUpdatePg){
            userForUpdatePg.Name = name;
            userForUpdatePg.Phone = phone;
            userForUpdatePg.Observation = observation,  
            
            await DataBaseOperationPgClient.updateClient(userForUpdatePg);      
            //await DatabaseOperationsClient.updateClient(userForUpdate);      
            return res.status(201).json({});
        }

        return res.status(401).json({message: 'id not found'});
    }

    static async deleteClient(req, res){
        const { id } = req.body;
        await DataBaseOperationPgClient.deleteClient(id);
       // await DatabaseOperationsClient.deleteClient(id);
        
        res.status(201).json({success: 'deleted'});
    }

}

module.exports =  ClientController;