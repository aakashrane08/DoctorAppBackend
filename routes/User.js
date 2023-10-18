const express = require("express")
const router = express.Router();

const {doctorSignup, patientSignup, login} = require("../controller/Auth")

router.use("/doctorSignup", doctorSignup);
router.use("/patientSignup", patientSignup);
router.use("/login", login);

module.exports = router