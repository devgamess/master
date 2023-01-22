var express = require("express");
const { GetCare, AddCare,DelCare } = require("../controller/careController");
var router = express.Router();
const auth = require("../middleware/auth")
/* GET home page. */
router.get("/:carId", auth, GetCare);
router.post("/", auth, AddCare);
router.delete("/:id", auth, DelCare);

module.exports = router;
