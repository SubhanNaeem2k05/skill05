const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../assets/files"); // The destination folder where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // A unique filename for the uploaded file
  },
});

let upload = multer({
  storage: storage,
});
const candidateController = require("../controller/candidateController");
router.post("/candidateLogin", candidateController.candidateLogin);
router.post("/candidateSignUp", candidateController.candidateSignup);
router.post(
  "/candidateapplyJob",
  upload.single("resume"),
  candidateController.candidateapplyjob
);
router.post("/forgetpassword", candidateController.forgetPassword);
router.post("/resetpassword", candidateController.resetPassword);
router.get("/getallcandidate", candidateController.getAllCandidate);
router.put("/api/shortList", candidateController.ShortList);
router.get(
  "/getshortlistedcandidate",
  candidateController.GetShortListedCandidate
);
router.post("/sendInvitation", candidateController.SendInvitation);

module.exports = router;
