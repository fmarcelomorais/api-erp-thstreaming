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

    static verifyAuthentication(req, res, next) {
        const  { authorization }  = req.headers;

        if(!authorization){
            return res.status(401).json();    
        }        
        const decoded = jwt.verify(authorization, process.env.SECRET_KEY);
        console.log(decoded);   

        if (!decoded) {
            return res.status(401);
        } 

        return next();
    }

}

module.exports = Middle;