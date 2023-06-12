const express = require('express');
const DatabaseOperation = require('../database/DatabaseOperations.js');
const cors = require('cors');
const app = express();

// Operações com banco de dados - Criação das tabelas
DatabaseOperation.openDbConnection();
DatabaseOperation.createTableUser();
DatabaseOperation.createTableClients();
DatabaseOperation.createTablePanel();
DatabaseOperation.createTableReseller();
DatabaseOperation.createTableAccount();
DatabaseOperation.createTablePlan();
//DatabaseOperation.alterTable();

const userRouter = require('../router/UserRouter.js');

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

module.exports = app;
