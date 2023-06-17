const express = require('express');
require('../databases/databaseMethods');
const cors = require('cors');
const app = express();

const userRouter = require('../router/UserRouter.js');
const clientRouter = require('../router/ClientRouter.js');
const panelRouter = require('../router/PanelRouter.js');
const planRouter = require('../router/PlanRouter.js');

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
app.use('/user', userRouter);
app.use('/client', clientRouter);
app.use('/panel', panelRouter);
app.use('/plan', planRouter);

module.exports = app;
