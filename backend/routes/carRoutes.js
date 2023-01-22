var express = require("express");
var router = express.Router();
const carController = require("../controller/carController");
const auth = require("../middleware/auth");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "public/images");
  },
  filename: function (req, file, callback) {
    callback(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

/* GET home page. */
router.get("/", auth, carController.GetCar);
router.get("/:id", auth, carController.FindOneCar);
router.post("/", auth, upload.single("image"), carController.AddCar);
router.post("/carNotIn", auth, carController.NotInCar);
router.put("/data", carController.UpdateCarData);
router.put("/image", auth, upload.single("image"), carController.UpdateCarImage);
router.delete("/:id", auth, carController.DelCar);

module.exports = router;
