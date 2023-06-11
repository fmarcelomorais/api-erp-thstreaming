const userRouter = require('express').Router();
const Middle = require('../middlewares/Middle');
const UserController = require('../controller/UserController');

userRouter.get('/user', UserController.getUser)
userRouter.get('/users', UserController.getAllUser)
userRouter.post('/register', Middle.verifyFieldsUserIsEmpty, UserController.registerUser);
userRouter.patch('/update', UserController.updateUser);
userRouter.delete('/delete', UserController.deleteUser);


module.exports = userRouter;
