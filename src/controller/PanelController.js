const DataBaseOperationsPgPanel = require('../databases/db_pg/DataBaseOperationsPgPanel');
const DataBaseOperationsPanel = require('../databases/sqlite/DataBaseOperationsPanel');
const PanelModel = require('../model/PanelModel.js');

class PanelController{

    static async getAllPanels(req, res){
        const panelsPg = await DataBaseOperationsPgPanel.getAllPanels();
        const panels = await DataBaseOperationsPanel.getAllPanels();
        res.json({panels: panelsPg});
    }

    static async getPanel(req, res){
        const { id } = req.body
        const panelPg = await DataBaseOperationsPgPanel.getPanel(id);
        const panel = await DataBaseOperationsPanel.getPanel(id);
        res.json({panel: panelPg});
    }

    static async registerPanel(req, res){
        const { panelDatas } = req;
        console.log(panelDatas);
        const newPanel = new PanelModel(panelDatas.name, panelDatas.login, panelDatas.password, panelDatas.url, panelDatas.credits, panelDatas.observation);
        console.log(newPanel);
        try {
            const registredPg = DataBaseOperationsPgPanel.createPanel(newPanel);
            const registred = DataBaseOperationsPanel.createPanel(newPanel);
         
            if(registredPg)
                return res.status(201).json({message: 'Created'});   
            return res.status(400).json({message: 'Not Registered'});          
        } catch (error) {
           return res.status(400).json({error: error.message});
        }
    }

    static async updatePanel(req, res){
        const {name, login, password,  url, credits, observation} = req.body;

        const panelForUpdatePg = await DataBaseOperationsPgPanel.getPanel(id);
        const panelForUpdate = await DataBaseOperationsPanel.getPanel(id);

        if(panelForUpdatePg){
            panelForUpdatePg.Name = name;
            panelForUpdatePg.Login = login;  
            panelForUpdatePg.Password = password;
            panelForUpdatePg.Url = url;
            panelForUpdatePg.Credits = credits;  
            panelForUpdatePg.Observation = observation;
            
            await DataBaseOperationsPgPanel.updateUser(panelForUpdatePg);      
            await DataBaseOperationsPanel.updateUser(panelForUpdatePg);      
            return res.status(201).json({});
        }

        return res.status(401).json({message: 'Panel not found'});
    }

    static async deletePanel(req, res){
        const { id } = req.body;
        await DataBaseOperationsPgPanel.deletePanel(id);
        await DataBaseOperationsPanel.deletePanel(id);
        
        res.status(201).json({success: 'deleted'});
    }

}

module.exports =  PanelController;