const jwt = require('jsonwebtoken');
require('dotenv').config();

class Middle{

    static verifyFieldsUserIsEmpty(req, res, next){
        const {name, phone, type, login, password} = req.body;
        console.log(name, phone, type, login, password)
        if(!name || !phone || !type || !login || !password) {

            return res.status(400).json({message:'All data needs to be filled in.'});
        }
        const userDatas = { name: name, phone: phone, type: type, login: login, password: password}
        req.userDatas = userDatas;
        return  next();
    }

    static verifyFieldsClientIsEmpty(req, res, next){
        const {name, phone, observation } = req.body;
        
        if(!name || !phone || !observation ) {
            return res.status(400).json({message:'All data needs to be filled in.'});
        }
        const clientDatas = { name: name, phone: phone, observation: observation}
        req.clientDatas = clientDatas;
        return  next();
    }

    static verifyFieldsPanelIsEmpty(req, res, next) {
        const { name, login, password, url, credits, observation, datePaymentCredits, dateRegister, idReseller } = req.body;

        if( !name || !login || !password || !url || !credits || !datePaymentCredits || !dateRegister || !idReseller ) {
            return res.status(400).json({message:'All data needs to be filled in.'});  
        }
        const panelDatas = {
            name: name, 
            login: login, 
            password: password,  
            url: url, 
            credits: credits, 
            observation: observation,
            datePaymentCredits: datePaymentCredits, 
            dateRegister: dateRegister,
            idReseller: idReseller
        };
        
        req.panelDatas = panelDatas
        return next();
    }

    static verifyFieldsPlanIsEmpty(req, res, next) {
        const { name, amount } = req.body;

        if( !name || !amount ){
            return res.status(400).json({message:'All data needs to be filled in.'});  
        }
        const planDatas = {name: name, amount: amount };
        req.planDatas = planDatas
        return next();
    }

    static verifyFieldsAccountIsEmpty(req, res, next) {

        const { idClient , idPanel, idPlan, idReseller, login, password, statusPayment, 
            statusAccount, dateMembership, dateRenovation, dateExpiration } = req.body

        if( !idClient || !idPanel || !idPlan || !idReseller || !login || !password || !statusPayment || !statusAccount || !dateMembership || !dateRenovation || !dateExpiration ){
            return res.status(400).json({message:'All data needs to be filled in.'});  
        }
        const accountDatas = { 
            idClient: idClient, 
            idPanel: idPanel, 
            idPlan: idPlan,  
            idReseller: idReseller,  
            login: login, 
            password: password, 
            statusPayment: statusPayment, 
            statusAccount: statusAccount, 
            dateMembership: dateMembership, 
            dateRenovation: dateRenovation, 
            dateExpiration: dateExpiration 
        };
        req.accountDatas = accountDatas
        return next();
    }
       
    static async verifyFieldsResellerIsEmpty(req, res, next) {
        const { name , phone, email, observation, idPanel } = req.body;
        console.log(name , phone, email, observation, idPanel)
        if( !name || !phone || !email ){
            return res.status(400).json({message:'All data needs to be filled in.'});      
        }
        const resellerDatas = {
            name: name, 
            phone: phone, 
            email: email, 
            observation: observation, 
            idPanel: idPanel  
        }
        
        req.resellerDatas = resellerDatas
        return next();
    }

    static verifyAuthentication(req, res, next) {
        const  { authorization }  = req.headers;

        if(!authorization){
            return res.status(401).json();    
        }        
        const decoded = jwt.verify(authorization, process.env.SECRET_KEY); 

        if (!decoded) {
            return res.status(401);
        } 
        
        return next();
    }
    
    static verifyFieldLogin(req, res, next) {
        const { login, password, type, key} = req.body;
        
        if( !type || !login || !password || !key) {

            return res.status(400).json({message:'All data needs to be filled in.'});
        }
        const userLogin = {  login: login, password: password, type: type, key: key}
        req.userLogin = userLogin;

        return  next();    
    }

}

module.exports = Middle;