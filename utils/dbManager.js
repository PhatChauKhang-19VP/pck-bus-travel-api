const sql = require('mssql')
const sqlConfig = require("../config/db")
module.exports = {
    connect: async () => {
        try {
            await sql.connect(sqlConfig)
        } catch (err) {
            console.log(err);
        }
    },
    sql: sql
}