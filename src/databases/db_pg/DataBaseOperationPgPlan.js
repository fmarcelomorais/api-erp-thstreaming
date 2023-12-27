const DatabaseOperationPg = require('./DatabasesOperationPg');

class DatabaseOperationPgPlan {

    static async getAllPlans(){
        const db = await DatabaseOperationPg.openDbConnection();
        const plans = await db.query("SELECT * FROM tbl_Plans");
        return plans.rows;
    }

    static async getPlan(id){
        const db = await DatabaseOperationPg.openDbConnection();
        const plan = await db.query(`SELECT * FROM tbl_plans WHERE Id=$1;`, [id]);
        return plan.rows;
    }

    static async createPlan(plan){
        const db = await DatabaseOperationPg.openDbConnection();
        const query =`INSERT INTO tbl_Plans (Id, Name, Amount) VALUES ( $1, $2, $3 );`;
        const values = [plan.Id, plan.Name, plan.Amount]
        const insert = await db.query(query, values);
        return insert;

    }

    static async updatePlan(plan) {
        const db = await DatabaseOperationPg.openDbConnection();

        const sql = `UPDATE tbl_Plans SET Id=$1, Name=$2, Amount=$3 WHERE Id=$4;`;
        const values = [plan.Id, plan.Name, plan.Amount, plan.Id]
        const update = await db.query(sql, values);
        return update;
    }

    static async deletePlan(id) {
        const db = await DatabaseOperationPg.openDbConnection();
        const deleted = await db.query(`DELETE FROM tbl_Plans WHERE Id=$1`, [id]);
        return deleted;
    }

}

module.exports = DatabaseOperationPgPlan;