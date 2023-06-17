const DatabaseOperation = require('./DatabaseOperations');

class DatabaseOperationsPlan {

    static async getAllPlans(){
        const db = await DatabaseOperation.openDbConnection();
        const plans = await db.all("SELECT * FROM tbl_Plan");
        return plans;
    }

    static async getPlan(id){
        const db = await DatabaseOperation.openDbConnection();
        const plan = await db.get(`SELECT * FROM tbl_plan WHERE Id = ${id};`);
        return plan;
    }

    static async createPlan(plan){
        const db = await DatabaseOperation.openDbConnection();
        const query =`INSERT INTO tbl_Plan (Id, Name, Amount) 
            VALUES ( ${plan.Id}, "${plan.Name}", "${plan.Amount}");`;
        const insert = await db.exec(query);
        return insert;

    }

    static async updatePlan(plan) {
        const db = await DatabaseOperation.openDbConnection();

        const sql = `UPDATE tbl_Plan SET 
             Id = ${plan.Id}, 
             Name = "${plan.Name}", 
             Phone = "${plan.Amount}"
            WHERE Id = ${plan.Id};`;

        const update = await db.exec(sql);
        return update;
    }

    static async deletePlan(id) {
        const db = await DatabaseOperation.openDbConnection();
        const deleted = await db.exec(`DELETE FROM tbl_Plan WHERE Id = ${id}`);
        return deleted;
    }

}

module.exports = DatabaseOperationsPlan;