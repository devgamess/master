var express = require("express");
var router = express.Router();
const agencyController = require("../controller/agencyController");
const auth = require("../middleware/auth")
/* GET home page. */
router.get("/",auth,agencyController.GetAgency);
router.get("/:id",auth,agencyController.FindOneAgency);
router.post("/",auth,agencyController.AddAgency);
router.put("/",auth,agencyController.UpdateAgency);
router.delete("/:id",auth,agencyController.DeleteAgency);

module.exports = router;
