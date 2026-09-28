const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: Number,
  isEnrolled: Boolean
});

module.exports = mongoose.model("Student", StudentSchema);