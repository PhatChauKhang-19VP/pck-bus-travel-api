const express = require("express");
const router = express.Router();
const sql = require("mssql");
const { connect } = require("../utils/dbManager");

/* GET users listing. */
router.get("/revenue/:month_interval", async (req, res, next) => {
	console.log(req.params.month_interval);
	await connect();
	const result =
		await sql.query`exec dbo.usp_thong_ke_doanh_thu ${req.params.month_interval}`;

	res.json(result.recordset);
});

module.exports = router;
