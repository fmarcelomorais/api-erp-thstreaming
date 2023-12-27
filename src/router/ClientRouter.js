const ClientRouter = require('express').Router();
const Middle = require('../middlewares/Middle');
const ClientController = require('../controller/ClientController');

ClientRouter.get('/clients', Middle.verifyAuthentication, ClientController.getAllClients)
ClientRouter.get('/client/:id', Middle.verifyAuthentication, ClientController.getClient)
ClientRouter.post('/register', Middle.verifyAuthentication, Middle.verifyFieldsClientIsEmpty, ClientController.registerClient);
ClientRouter.patch('/update', Middle.verifyAuthentication, ClientController.updateClient);
ClientRouter.delete('/delete/:id', Middle.verifyAuthentication, ClientController.deleteClient);

module.exports = ClientRouter;
