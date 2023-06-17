const PlanRouter = require('express').Router();
const Middle = require('../middlewares/Middle');
const PlanController = require('../controller/PlanController');

PlanRouter.get('/plan', Middle.verifyAuthentication, PlanController.getPlan)
PlanRouter.get('/plans', Middle.verifyAuthentication, PlanController.getAllPlans)
PlanRouter.post('/register', Middle.verifyAuthentication, Middle.verifyFieldsPlanIsEmpty, PlanController.registerPlan);
PlanRouter.patch('/update', Middle.verifyAuthentication, PlanController.updatePlan);
PlanRouter.delete('/delete', Middle.verifyAuthentication, PlanController.deletePlan);

module.exports = PlanRouter;
