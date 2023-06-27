const resetRouter = require('express').Router();
const resetController = require('../controller/ResetTablesController');
const Middle = require('../middlewares/Middle');

resetRouter.get('/', resetController.root)
resetRouter.post('/reset', Middle.verifyAuthentication, resetController.reset);

module.exports = resetRouter;