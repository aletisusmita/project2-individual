const express = require("express");
const router = express.Router();


const collegecontroller = require("../controllers/collegeController")

const internController = require("../controllers/internController")

router.post("/functionup/colleges", collegecontroller.createCollege)

router.post("/functionup/interns", internController.createIntern)

router.get("/functionup/collegeDetails",internController.getInter)

module.exports = router 