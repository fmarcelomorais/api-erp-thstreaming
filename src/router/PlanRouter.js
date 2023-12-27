const PlanRouter = require('express').Router();
const Middle = require('../middlewares/Middle');
const PlanController = require('../controller/PlanController');

PlanRouter.get('/plans', Middle.verifyAuthentication, PlanController.getAllPlans)
PlanRouter.get('/plan/:id', Middle.verifyAuthentication, PlanController.getPlan)
PlanRouter.post('/register', Middle.verifyAuthentication, Middle.verifyFieldsPlanIsEmpty, PlanController.registerPlan);
PlanRouter.patch('/update', Middle.verifyAuthentication, PlanController.updatePlan);
PlanRouter.delete('/delete/:id', Middle.verifyAuthentication, PlanController.deletePlan);

module.exports = PlanRouter;
