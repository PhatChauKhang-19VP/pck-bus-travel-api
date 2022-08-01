var express = require("express");
var router = express.Router();

const usersRouter = require("./users");
const toursRouter = require("./tours.route");
const addressRouter = require("./address.route");

router.use("/users", usersRouter);
router.use("/tours", toursRouter);
router.use("/address", addressRouter);

/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("index", { title: "Express" });
});

module.exports = router;
