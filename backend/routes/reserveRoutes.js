var express = require("express");
var router = express.Router();
const reserveController = require("../controller/reserveController");
const auth = require("../middleware/auth")
/* GET home page. */
router.get("/",auth,reserveController.GetReserveAll);
router.delete("/:id",auth,reserveController.DeleteReserve);
router.get("/is-submit-reserve",auth,reserveController.GetReserveIsSubmit);
router.get("/:id",auth,reserveController.FindOneReserve);
router.post("/onsubmit-reserve",auth,reserveController.SubmitReserve);
router.post("/",auth,reserveController.AddReserve);
// router.put("/",auth,agencyController.UpdateAgency);
// router.delete("/:id",auth,agencyController.DeleteAgency);

module.exports = router;
