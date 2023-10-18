const mongoose = require("mongoose");

// Define the Profile schema
const doctorProfileSchema = new mongoose.Schema({
	gender: {
		type: String,
        enum:["Not Selected", "Male", "Female", "Trans"]
	},
	about: {
		type: String,
		trim: true,
	},
});

// Export the Profile model
module.exports = mongoose.model("DoctorProfile", doctorProfileSchema);
