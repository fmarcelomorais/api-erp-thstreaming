const userRouter = require('express').Router();
const Middle = require('../middlewares/Middle');
const UserController = require('../controller/UserController');

userRouter.get('/user', Middle.verifyAuthentication, UserController.getUser)
userRouter.get('/users', Middle.verifyAuthentication, UserController.getAllUser)
userRouter.post('/register', Middle.verifyAuthentication, Middle.verifyFieldsUserIsEmpty, UserController.registerUser);
userRouter.patch('/update', Middle.verifyAuthentication, UserController.updateUser);
userRouter.delete('/delete', Middle.verifyAuthentication, UserController.deleteUser);
userRouter.post('/login', Middle.verifyFieldLogin, UserController.loginUser);


module.exports = userRouter;
