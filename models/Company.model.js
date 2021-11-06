const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const CompanySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, "Please provide a company name"],
    minlength: 3,
    maxlength: 50,
  },
  companyEmail: {
    type: String,
    required: [true, "Please provide a email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide valid email",
    ],
    unique: true,
  },
  companyPassword: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 6,
  },
  companyWebsite: {
    type: String,
  },
  companyLinkedIn: {
    type: String,
  },
  companyLogo: {
    type: String,
  },
  companyAbout: {
    type: String,
  },
});

CompanySchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.companyPassword = await bcrypt.hash(this.companyPassword, salt);
});

CompanySchema.methods.createJWT = function () {
  return jwt.sign(
    {
      companyId: this._id,
      companyName: this.companyName,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

CompanySchema.methods.comparePassword = async function (companyPassword) {
  const isMatch = await bcrypt.compare(companyPassword, this.companyPassword);

  return isMatch;
};

module.exports = mongoose.model("Company", CompanySchema);
