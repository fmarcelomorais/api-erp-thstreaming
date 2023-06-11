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

}

module.exports = Middle;