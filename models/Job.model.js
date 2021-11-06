const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
      required: [true, "Please provide a job title"],
      minlength: 3,
      maxlength: 40,
    },
    jobTime: {
      type: String,
      enum: ["Full-Time", "Part-Time"],
      required: [true, "Please provide a job type"],
    },
    jobDesc: {
      type: String,
      required: [true, "Please provide description"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: [true, "Please provide a company id"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", JobSchema);
