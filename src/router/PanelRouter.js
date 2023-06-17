const PanelRouter = require('express').Router();
const Middle = require('../middlewares/Middle');
const PanelController = require('../controller/PanelController');

PanelRouter.get('/panel', Middle.verifyAuthentication, PanelController.getPanel)
PanelRouter.get('/panels', Middle.verifyAuthentication, PanelController.getAllPanels)
PanelRouter.post('/register', Middle.verifyAuthentication, Middle.verifyFieldsPanelIsEmpty, PanelController.registerPanel);
PanelRouter.patch('/update', Middle.verifyAuthentication, PanelController.updatePanel);
PanelRouter.delete('/delete', Middle.verifyAuthentication, PanelController.deletePanel);

module.exports = PanelRouter;
