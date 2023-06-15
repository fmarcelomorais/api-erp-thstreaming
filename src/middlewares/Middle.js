const jwt = require('jsonwebtoken');
require('dotenv').config();

class Middle{

    static verifyFieldsUserIsEmpty(req, res, next){
        const {name, phone, type, login, password} = req.body;
        
        if(!name || !phone || !type || !login || !password) {

            return res.status(400).json({message:'All data needs to be filled in.'});
        }
        const userDates = { name: name, phone: phone, type: type, login: login, password: password}
        req.userDates = userDates;
        return  next();
    }

    static verifyFieldsClientIsEmpty(req, res, next){
        const {name, phone, observation } = req.body;
        
        if(!name || !phone || !observation ) {

            return res.status(400).json({message:'All data needs to be filled in.'});
        }
        const clientDates = { name: name, phone: phone, observation: observation}
        req.clientDates = clientDates;
        return  next();
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
    
    static verifyTypeUser(){
        
    }

}

module.exports = Middle;