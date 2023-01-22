var express = require("express");
var router = express.Router();
const auth = require("../middleware/auth")
const authenController = require("../controller/authenController")

router.get('/users',auth, authenController.users)
router.get('/userMe',auth, authenController.userMe)
router.get('/user/:id',auth, authenController.editUser)
router.put('/user/:id',auth, authenController.updateUser)
router.delete('/users/:id',auth, authenController.delUser)
router.post("/login", authenController.login);
router.post("/register", authenController.register);
router.post("/changePassword", authenController.changePassword);
router.post("/logout",auth, authenController.logout);

module.exports = router;
