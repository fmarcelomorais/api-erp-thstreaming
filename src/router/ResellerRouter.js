const resellerRouter = require('express').Router();
const Middle = require('../middlewares/Middle');
const ResellerController = require('../controller/ResellerController');

resellerRouter.get('/resellers', Middle.verifyAuthentication, ResellerController.getAllResellers)
resellerRouter.get('/reseller', Middle.verifyAuthentication, ResellerController.getReseller)
resellerRouter.post('/register', Middle.verifyAuthentication, Middle.verifyFieldsResellerIsEmpty, ResellerController.registerReseller);
resellerRouter.patch('/update', Middle.verifyAuthentication, ResellerController.updateReseller);
resellerRouter.delete('/delete', Middle.verifyAuthentication, ResellerController.deleteReseller);

module.exports = resellerRouter;
