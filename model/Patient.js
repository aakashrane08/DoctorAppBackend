const mongoose = require("mongoose");

const patientSchema = mongoose.Schema({
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
  bloodGroup:{
    type:String,
    enum:["APLUS","AMINUS","BPLUS","BMINUS","OPLUS","OMINUS"],
    require:true,
  },
  role: {
    type:String,
    require:true,
    default:"Patient",
  },
  token: {
    type:String
  },
  additionalDetail: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PatientProfile"
},
  appointment:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"appointment"
    }
  ],
  image:{
    type:String,
    require:true
  }
},
{timestamps: true});

module.exports = mongoose.model("patient", patientSchema);