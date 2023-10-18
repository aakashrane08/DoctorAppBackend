const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Doctor = require("../model/Doctor");
const Patient = require("../model/Patient");
const DoctorProfile = require("../model/DoctorProfile");
const PatientProfile = require("../model/PatientProfile");
require("dotenv").config();

exports.doctorSignup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      specialization,
      qualification,
    } = req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !specialization ||
      !qualification
    ) {
      return res.status(403).send({
        success: false,
        message: "All fields Required",
      });
    }

    const existingUser = await Doctor.findOne({ email });

    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "Doctor Already exist, please login",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const doctorDetails = await DoctorProfile.create({
      gender: "Not Selected",
      about: null,
    });
    const doctor = await Doctor.create({
      firstName,
      lastName,
      email,
      specialization,
      qualification,
      password: hashPassword,
      additionalDetail: doctorDetails._id,
    });

    return res.status(200).json({
      success: true,
      doctor,
      message: "Doctor registered successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Doctor cannot be registered. Please try again.",
    });
  }
};

exports.patientSignup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, bloodGroup } = req.body;
    if (!firstName || !lastName || !email || !password || !bloodGroup) {
      return res.status(403).send({
        success: false,
        message: "All fields Required",
      });
    }

    const existingUser = await Patient.findOne({ email });
    console.log(existingUser);

    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "Patient Already exist, please login",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const patientDetails = await PatientProfile.create({
      gender: "Not Selected",
      age: null,
      contactNumber: null,
    });

    const patient = await Patient.create({
      firstName,
      lastName,
      email,
      bloodGroup,
      password: hashPassword,
      additionalDetail: patientDetails._id,
    });

    return res.status(200).json({
      success: true,
      patient,
      message: "Patient registered successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Patient cannot be registered. Please try again.",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(403).send({
        success: false,
        message: "All fields required",
      });
    }

    const doctor = (await Doctor.findOne({ email }));
    const patient = (await Patient.findOne({ email }));

    const user = doctor || patient;
      

    if (!user) {
      res.status(400).json({
        success: false,
        message: "You need to Register First.",
      });
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        {
          email: user.email,
          id: user._id,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );

      user.token = token;
      user.password = undefined;

      res.status(200).json({
        success:true,
        token,
        user,
        message:"Login Successfull"
      })
    } else {
      res.status(401).json({
        success: false,
        message: "Wrong Password",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Cannot be Login. Please try again.",
    });
  }
};
