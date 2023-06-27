const DatabaseOperationsPg = require('../databases/db_pg/DatabasesOperationPg');
//const DatabaseOperations = require('../databases/sqlite/DatabaseOperations');
require('dotenv').config();

class ResetTables{

    static async reset(req, res){
        const {confirm, force, key} = req.body;
        if(!!confirm && key === process.env.KEY){
            const resetPg = await DatabaseOperationsPg.redoTables(force)    
           // const reset = await DatabaseOperations.redoTables(force)    
            return res.json({message: resetPg});
        }
        return res.json({message:"Aborted"});

    }

    static root(req, res) {
        return res.json({message:'Api TH Streaming Runing'})
    }
}

module.exports = ResetTables;