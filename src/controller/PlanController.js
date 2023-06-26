const DataBaseOperationsPgPlan = require('../databases/db_pg/DataBaseOperationPgPlan');
const DataBaseOperationsPlan = require('../databases/sqlite/DataBaseOperationsPlan');
const PlanModel = require('../model/PlanModel.js');

class PlanController{

    static async getAllPlans(req, res){
        const plansPg = await DataBaseOperationsPgPlan.getAllPlans();
        const plans = await DataBaseOperationsPlan.getAllPlans();
        res.json({plans: plansPg});
    }

    static async getPlan(req, res){
        const { id } = req.body
        const planPg = await DataBaseOperationsPgPlan.getPlan(id);
        const plan = await DataBaseOperationsPlan.getPlan(id);
        res.json({plan: planPg});
    }

    static async registerPlan(req, res){
        const { planDatas } = req;
        const newPlan = new PlanModel(planDatas.name, planDatas.amount);
        try {
            const registredPg = DataBaseOperationsPgPlan.createPlan(newPlan);
            const registred = DataBaseOperationsPlan.createPlan(newPlan);
         
            if(registredPg)
                return res.status(201).json({message: 'Created'});   
            return res.status(400).json({message: 'Not Registered'});          
        } catch (error) {
           return res.status(400).json({error: error.message});
        }
    }

    static async updatePlan(req, res){
        const { id, name, amount } = req.body;

        const planForUpdatePg = await DataBaseOperationsPgPlan.getPlan(id);
        const planForUpdate = await DataBaseOperationsPlan.getPlan(id);

        if(planForUpdate){
            planForUpdate.Name = name;
            planForUpdate.Amount = amount;
            
            await DataBaseOperationsPgPlan.updatePlan(planForUpdatePg);      
            await DataBaseOperationsPlan.updatePlan(planForUpdate);      
            return res.status(201).json({});
        }

        return res.status(401).json({message: 'id not found'});
    }

    static async deletePlan(req, res){
        const { id } = req.body;
        await DataBaseOperationsPgPlan.deletePlan(id);
        await DataBaseOperationsPlan.deletePlan(id);
        
        res.status(201).json({success: 'deleted'});
    }

}

module.exports =  PlanController;