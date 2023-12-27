const resellerRouter = require('express').Router();
const Middle = require('../middlewares/Middle');
const ResellerController = require('../controller/ResellerController');

resellerRouter.get('/reseller/:id', Middle.verifyAuthentication, ResellerController.getReseller)
resellerRouter.get('/resellers', Middle.verifyAuthentication, ResellerController.getAllResellers)
resellerRouter.post('/register', Middle.verifyAuthentication, Middle.verifyFieldsResellerIsEmpty, ResellerController.registerReseller);
resellerRouter.patch('/update', Middle.verifyAuthentication, ResellerController.updateReseller);
resellerRouter.delete('/delete/:id', Middle.verifyAuthentication, ResellerController.deleteReseller);

module.exports = resellerRouter;
