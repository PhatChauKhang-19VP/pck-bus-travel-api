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

/**
exec usp_search_tour_dk
	@ds_ma_tinh = N'[]',
	@ngay_di = null,
	@from_so_ngay =3,
	@to_so_ngay = 3,
	@so_nguoi  = null,
	@from_gia_tien = 100,
	@to_gia_tien = 1000
 */
router.post("/tim-tour", async (req, res, next) => {
	await connect();

	console.info(req.body);

	const ds_ma_tinh = req.body.ds_ma_tinh
		? `'${JSON.stringify(req.body.ds_ma_tinh)}'`
		: "null";
	const ngay_di = req.body.ngay_di ? `'${req.body.ngay_di}'` : "null";
	const so_nguoi = req.body.so_nguoi ? req.body.so_nguoi : "null";
	const from_so_ngay = req.body.from_so_ngay
		? `${req.body.from_so_ngay}`
		: "null";
	const to_so_ngay = req.body.to_so_ngay ? `${req.body.to_so_ngay}` : "null";
	const from_gia_tien = req.body.from_gia_tien
		? `${req.body.from_gia_tien}`
		: "null";
	const to_gia_tien = req.body.to_gia_tien
		? `${req.body.to_gia_tien}`
		: "null";

	const query = `
	exec usp_search_tour_dk
		@ds_ma_tinh = ${ds_ma_tinh},
		@ngay_di = ${ngay_di},
		@so_nguoi = ${so_nguoi},
		@from_so_ngay = ${from_so_ngay},
		@to_so_ngay = ${to_so_ngay},
		@from_gia_tien = ${from_gia_tien},
		@to_gia_tien = ${to_gia_tien}
	`;

	console.log(query);

	const result = await sql.query(query);

	res.json(result.recordset);
});
module.exports = router;
