const DatabaseOperation = require('./sqlite/DatabaseOperations');

DatabaseOperation.openDbConnection();
DatabaseOperation.createTableUser();
DatabaseOperation.createTableClients();
DatabaseOperation.createTablePanel();
DatabaseOperation.createTableReseller();
DatabaseOperation.createTableAccount();
DatabaseOperation.createTablePlan();
//DatabaseOperation.alterTable();


module.exports = DatabaseOperation;