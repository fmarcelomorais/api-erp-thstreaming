const DatabaseOperationsPgReseller = require('../databases/db_pg/DataBaseOperationsPgReseller');
const DatabaseOperationsReseller = require('../databases/sqlite/DataBaseOperationsReseller');
const ResellerModel = require('../model/ResellerModel');

class ResellerController{

    static async getAllResellers(req, res){
        const resellersPg = await DatabaseOperationsPgReseller.getAllResellers();
        const resellers = await DatabaseOperationsReseller.getAllResellers();
        res.json({resellers: resellersPg});
    }

    static async getReseller(req, res){
        const { id } = req.body
        const resellerPg = await DatabaseOperationsPgReseller.getReseller(id);
        const reseller = await DatabaseOperationsReseller.getReseller(id);
        res.json({reseller: resellerPg});
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
        
        try {
            const registredPg = DatabaseOperationsPgReseller.createReseller(newReseller);
            const registred = DatabaseOperationsReseller.createReseller(newReseller);
         
            if(registredPg)
                return res.status(201).json({message: 'Created'});   
            return res.status(400).json({message: 'Not Registered'});          
        } catch (error) {
           return res.status(400).json({error: error.message});
        }
    }

    static async updateReseller(req, res){
        const { id, name , phone, email, observation, credits, datepaymentcredits, dateregister, fk_panel } = req.body;

        const resellerForUpdatePg = await DatabaseOperationsPgReseller.getReseller(id);
        const resellerForUpdate = await DatabaseOperationsReseller.getReseller(id);

        if(resellerForUpdatePg){
            resellerForUpdatePg.Id = id; 
            resellerForUpdatePg.Name = name;
            resellerForUpdatePg.Phone = phone;
            resellerForUpdatePg.Email = email;
            resellerForUpdatePg.Observation = observation;
            resellerForUpdatePg.Credits = credits;
            resellerForUpdatePg.DatePaymentCredits = datepaymentcredits;
            resellerForUpdatePg.DateRegister = dateregister;
            resellerForUpdatePg.IdPanel = fk_panel;
            
            await DatabaseOperationsPgReseller.updateReseller(resellerForUpdatePg);      
            await DatabaseOperationsReseller.updateReseller(resellerForUpdatePg);      
            return res.status(201).json({});
        }

        return res.status(401).json({message: 'id not found'});
    }

    static async deleteReseller(req, res){
        const { id } = req.body;
        await DatabaseOperationsPgReseller.deleteReseller(id);
        await DatabaseOperationsReseller.deleteReseller(id);
        
        res.status(201).json({success: 'deleted'});
    }

}

module.exports =  ResellerController;