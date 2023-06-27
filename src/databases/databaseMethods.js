//const DatabaseOperation = require('./sqlite/DatabaseOperations');
const DatabasesOperationPg = require('./db_pg/DatabasesOperationPg')

function DatabaseOperationsStart(){
/*     DatabaseOperation.openDbConnection();    
    DatabaseOperation.createTableUser();
    DatabaseOperation.createTableClients();
    DatabaseOperation.createTablePanel();
    DatabaseOperation.createTableReseller();
    DatabaseOperation.createTableAccount();
    DatabaseOperation.createTablePlan(); */

// Database Neon - Postgre

    DatabasesOperationPg.openDbConnection();
    DatabasesOperationPg.createTableUser();
    DatabasesOperationPg.createTableClients();
    DatabasesOperationPg.createTablePanel();
    DatabasesOperationPg.createTableReseller();
    DatabasesOperationPg.createTableAccount();
    DatabasesOperationPg.createTablePlan();
}
module.exports = DatabaseOperationsStart;