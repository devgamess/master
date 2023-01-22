var express = require("express");
var router = express.Router();
const rankController = require("../controller/rankController");
const auth = require("../middleware/auth")
/* GET home page. */
router.get("/",auth,rankController.GetRank);
router.get("/:id",auth,rankController.FindOneRank);
router.post("/",auth,rankController.AddRank);
router.put("/",auth,rankController.UpdateRank);
router.delete("/:id",auth,rankController.DelRank);

module.exports = router;
