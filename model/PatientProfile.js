const mongoose = require("mongoose");

// Define the Profile schema
const patientProfileSchema = new mongoose.Schema({
	gender: {
		type: String,
        enum:["Not Selected", "Male", "Female", "Trans"]
	},
	age: {
		type: String,
		require: true
	},
	contactNumber: {
		type: Number,
	},
});

// Export the Profile model
module.exports = mongoose.model("PatientProfile", patientProfileSchema);
