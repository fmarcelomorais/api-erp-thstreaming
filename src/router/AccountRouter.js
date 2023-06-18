const accountRouter = require('express').Router();
const Middle = require('../middlewares/Middle');
const AccountController = require('../controller/AccountController');

accountRouter.get('/accounts', Middle.verifyAuthentication, AccountController.getAllAccounts)
accountRouter.get('/account', Middle.verifyAuthentication, AccountController.getAccount)
accountRouter.post('/register', Middle.verifyAuthentication, Middle.verifyFieldsAccountIsEmpty, AccountController.registerAccount);
accountRouter.patch('/update', Middle.verifyAuthentication, AccountController.updateAccount);
accountRouter.delete('/delete', Middle.verifyAuthentication, AccountController.deleteAccount);

module.exports = accountRouter;