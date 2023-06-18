const DataBaseOperationsPanel = require('../databases/sqlite/DataBaseOperationsPanel');
const PanelModel = require('../model/PanelModel.js');

class PanelController{

    static async getAllPanels(req, res){
        const panels = await DataBaseOperationsPanel.getAllPanels();
        res.json({panels: panels});
    }

    static async getPanel(req, res){
        const { id } = req.body
        const panel = await DataBaseOperationsPanel.getPanel(id);
        res.json({panel: panel});
    }

    static async registerPanel(req, res){
        const { panelDatas } = req;
        console.log(panelDatas);
        const newPanel = new PanelModel(panelDatas.name, panelDatas.login, panelDatas.password, panelDatas.url, panelDatas.credits, panelDatas.observation);
        console.log(newPanel);
        try {
            const registred = DataBaseOperationsPanel.createPanel(newPanel);
         
            if(registred)
                return res.status(201).json({message: 'Created'});   
            return res.status(400).json({message: 'Not Registered'});          
        } catch (error) {
           return res.status(400).json({error: error.message});
        }
    }

    static async updatePanel(req, res){
        const {name, login, password,  url, credits, observation} = req.body;

        const panelForUpdate = await DataBaseOperationsPanel.getPanel(id);

        if(panelForUpdate){
            panelForUpdate.Name = name;
            panelForUpdate.Login = login;  
            panelForUpdate.Password = password;
            panelForUpdate.Url = url;
            panelForUpdate.Credits = credits;  
            panelForUpdate.Observation = observation;
            
            await DataBaseOperationsPanel.updateUser(panelForUpdate);      
            return res.status(201).json({});
        }

        return res.status(401).json({message: 'Panel not found'});
    }

    static async deletePanel(req, res){
        const { id } = req.body;
        const deleted = await DataBaseOperationsPanel.deletePanel(id);
        
        res.status(201).json({success: 'deleted'});
    }

}

module.exports =  PanelController;