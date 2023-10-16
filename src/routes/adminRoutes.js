const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");

router.get("/recuriter", adminController.GetRecuriter);
router.put("/updaterecuriter", adminController.UpdateRecuriter);
router.post("/loginadmin", adminController.AdminLogin);

module.exports = router;
