var express = require("express");
var router = express.Router();

const usersRouter = require("./users");
const toursRouter = require("./tours.route");
const addressRouter = require("./address.route");
const statisticRouter = require("./statistic.route");

const { connect, sql } = require("../utils/dbManager");

router.use("/users", usersRouter);
router.use("/tours", toursRouter);
router.use("/address", addressRouter);
router.use("/statistic", statisticRouter);

/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("index", { title: "Express" });
});

router.post("/sql", async (req, res, next) => {
	const query = req.body.query;

	console.info(query);

	await connect();

	const result = await sql.query(query);

	res.json(result.recordset);
});

module.exports = router;
