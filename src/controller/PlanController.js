const DataBaseOperationsPlan = require('../databases/sqlite/DataBaseOperationsPlan');
const PlanModel = require('../model/PlanModel.js');

class PlanController{

    static async getAllPlans(req, res){
        const plans = await DataBaseOperationsPlan.getAllPlans();
        res.json({plans: plans});
    }

    static async getPlan(req, res){
        const { id } = req.body
        const plan = await DataBaseOperationsPlan.getPlan(id);
        res.json({plan: plan});
    }

    static async registerPlan(req, res){
        const { planDates } = req;
        const newPlan = new PlanModel(planDates.name, planDates.amount);
        try {
            const registred = DataBaseOperationsPlan.createPlan(newPlan);
         
            if(registred)
                return res.status(201).json({message: 'Created'});   
            return res.status(400).json({message: 'Not Registered'});          
        } catch (error) {
           return res.status(400).json({error: error.message});
        }
    }

    static async updatePlan(req, res){
        const { id, name, amount } = req.body;

        const planForUpdate = await DataBaseOperationsPlan.getPlan(id);

        if(planForUpdate){
            planForUpdate.Name = name;
            planForUpdate.Amount = amount;
            
            await DataBaseOperationsPlan.updatePlan(planForUpdate);      
            return res.status(201).json({});
        }

        return res.status(401).json({message: 'id not found'});
    }

    static async deletePlan(req, res){
        const { id } = req.body;
        const deleted = await DataBaseOperationsPlan.deletePlan(id);
        
        res.status(201).json({success: 'deleted'});
    }

}

module.exports =  PlanController;