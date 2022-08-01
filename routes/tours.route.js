const express = require("express");
const router = express.Router();
const { connect, sql } = require("../utils/dbManager");

/* GET users listing. */
router.get("/", async (req, res, next) => {
	await connect();
	const result = await sql.query`select * from tours`;

	res.json(result.recordset);
});

router.post("/dat-tour", async (req, res, next) => {
	await connect();

	data = await req.body;

	const query = `exec dbo.usp_dk_tour
	@ma_tour = '${req.body.ma_tour}',
	@mo_lan_thu = ${req.body.mo_lan_thu},
	@ma_kh_dk = '${req.body.ma_kh_dk}',
	@ds_kh_dk = N'${JSON.stringify(req.body.ds_kh_dk)}',
	@ma_ks = ${req.body.ma_ks},
	@ds_phong_dk =N'${JSON.stringify(req.body.ds_phong_dk)}'`;

	const result = await sql.query(query);

	res.json({
		query,
		result,
	});
});

module.exports = router;
