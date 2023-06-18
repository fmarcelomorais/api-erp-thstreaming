const DatabaseOperationsReseller = require('../databases/sqlite/DataBaseOperationsReseller');
const ResellerModel = require('../model/ResellerModel');

class ResellerController{

    static async getAllResellers(req, res){
        const resellers = await DatabaseOperationsReseller.getAllResellers();
        res.json({resellers: resellers});
    }

    static async getReseller(req, res){
        const { id } = req.body
        const reseller = await DatabaseOperationsReseller.getReseller(id);
        res.json({reseller: reseller});
    }

    static async registerReseller(req, res){
        const { resellerDatas } = req;
        
        const newReseller = new ResellerModel(
            resellerDatas.name,
            resellerDatas.phone,
            resellerDatas.email,
            resellerDatas.observation,
            resellerDatas.credits,
            resellerDatas.datePaymentCredits,
            resellerDatas.dateRegister,
            resellerDatas.idPanel,
        );
        console.log(newReseller)
        try {
            const registred = DatabaseOperationsReseller.createReseller(newReseller);
         
            if(registred)
                return res.status(201).json({message: 'Created'});   
            return res.status(400).json({message: 'Not Registered'});          
        } catch (error) {
           return res.status(400).json({error: error.message});
        }
    }

    static async updateReseller(req, res){
        const { 
                id, idClient , idPanel, idPlan, login, password, statusPayment, 
                statusAccount, dateMembership, dateRenovation, dateExpiration 
            } = req.body;

        const resellerForUpdate = await DatabaseOperationsReseller.getReseller(id);

        if(resellerForUpdate){
            resellerForUpdate.Id = id; 
            resellerForUpdate.IdClient = idClient;
            resellerForUpdate.IdPanel = idPanel;
            resellerForUpdate.IdPanel = idPlan; 
            resellerForUpdate.Login = login; 
            resellerForUpdate.Password = password;
            resellerForUpdate.StatusPayment = statusPayment; 
            resellerForUpdate.StatusAccount = statusAccount; 
            resellerForUpdate.DateMembership = dateMembership; 
            resellerForUpdate.DateRenovation = dateRenovation; 
            resellerForUpdate.DateExpiration = dateExpiration;
            
            await DatabaseOperationsReseller.updateReseller(resellerForUpdate);      
            return res.status(201).json({});
        }

        return res.status(401).json({message: 'id not found'});
    }

    static async deleteReseller(req, res){
        const { id } = req.body;
        const deleted = await DatabaseOperationsReseller.deleteReseller(id);
        
        res.status(201).json({success: 'deleted'});
    }

}

module.exports =  ResellerController;