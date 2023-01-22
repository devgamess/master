var express = require("express");
var router = express.Router();
const chauffeurController = require("../controller/chauffeurController");
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
router.get("/", auth, chauffeurController.GetChauffeur);
router.get("/:id", auth, chauffeurController.FindOneChauffeur);
router.post("/", auth, upload.single("image"), chauffeurController.AddChauffeur);
router.put("/data",auth, chauffeurController.UpdateChauffeurData);
router.put("/image", auth, upload.single("image"), chauffeurController.UpdateChauffeurImage);
router.delete("/:id", auth, chauffeurController.DelChauffeur);

module.exports = router;
