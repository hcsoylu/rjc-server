const Company = require("../models/Company.model");

const register = async (req, res) => {
  const company = await Company.create({ ...req.body });

  const token = company.createJWT();

  res.status(200).json({ token });
};

const login = async (req, res) => {
  const { companyEmail, companyPassword } = req.body;

  if (!companyEmail || !companyPassword) {
    return res.status(500).json("please provide email and password");
  }

  const company = await Company.findOne({ companyEmail });

  if (!company) {
    return res.status(500).json("credentials is wrong");
  }

  const isPasswordCorrect = await company.comparePassword(companyPassword);

  if (!isPasswordCorrect) {
    return res.status(500).json("credentials is wrong");
  }

  const token = company.createJWT();

  res.status(200).json({
    token,
  });
};

const edit = async (req, res) => {
  const { id: companyId } = req.params;

  const company = await Company.findOneAndUpdate({ _id: companyId }, req.body, {
    new: true,
  });

  if (!company) {
    return res
      .status(404)
      .json({ msg: `no company with this id : ${companyId}` });
  }

  res.status(200).json({ company });
};

module.exports = {
  register,
  login,
  edit,
};
