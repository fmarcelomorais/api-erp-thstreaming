const express = require('express');
const DatabaseOperationsStart = require('../databases/databaseMethods');
DatabaseOperationsStart();
const cors = require('cors');
const app = express();

const userRouter = require('../router/UserRouter.js');
const clientRouter = require('../router/ClientRouter.js');
const panelRouter = require('../router/PanelRouter.js');
const planRouter = require('../router/PlanRouter.js');
const accountRouter = require('../router/AccountRouter.js');
const resellerRouter = require('../router/ResellerRouter.js');
const resetRouter = require('../router/ResetRouter');

//Middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(
    cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization', 'access-control-allow-origin'],
        credentials: true,
        optionsSuccessStatus: 200,
        maxAge: 86400
    })
);

//Rotas
app.get('/', (req, res) => res.json({message:'Api TH Streaming Runing'}));
app.use('/user', userRouter);
app.use('/client', clientRouter);
app.use('/panel', panelRouter);
app.use('/plan', planRouter);
app.use('/account', accountRouter);
app.use('/reseller', resellerRouter);
app.use('/api', resetRouter);

module.exports = app;
