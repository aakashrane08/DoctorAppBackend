const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
      trim: true,
    },
    lastName: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
    },
    password: {
      type: String,
      require: true,
    },
    specialization: {
      type: String,
      enum: ["Dentist", "Gynecologist", "Orthopedist", "Cardiologist", "Neutrologist"],
      require: true,
    },
    qualification: {
      type: String,
      enum: ["MBBS", "MD", "PGDMA"],
    },
    role: {
      type:String,
      require:true,
      default:"Doctor",
    },
    token: {
      type:String
    },
    additionalDetail: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DoctorProfile"
    },
    appointment: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
      },
    ],
    image: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("doctor", doctorSchema);
