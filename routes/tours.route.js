const express = require('express');
const router = express.Router();
const sql = require("mssql");
const { connect } = require('../utils/dbManager');

/* GET users listing. */
router.get('/', async (req, res, next) => {
    await connect();
    const result = await sql.query`select * from tours`

    res.json(result.recordset);
});

module.exports = router;