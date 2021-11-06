const Job = require("../models/Job.model");

const getAllJobs = async (req, res) => {
  const allJobs = await Job.find({}).populate("createdBy");
  res.status(200).json(allJobs);
};

const getAllCompanyJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.params.companyId }).populate(
    "createdBy"
  );

  res.status(200).json(jobs);
};

const getJob = async (req, res) => {
  const { jobId } = req.params;

  const job = await Job.findById(jobId);

  if (!job) {
    return res.status(404).json("no job with this id");
  }

  res.status(200).json(job);
};

const createJob = async (req, res) => {
  const job = await Job.create(req.body);

  res.status(200).json(job);
};

const deleteJob = async (req, res) => {
  const { jobId } = req.params;
  const companyId = req.company.companyId;

  const deletedJob = await Job.findOneAndDelete({
    _id: jobId,
    createdBy: companyId,
  });

  if (!deletedJob) {
    return res.status(404).json("no job with this id");
  }

  res.status(200).json(deletedJob);
};

const updateJob = async (req, res) => {
  const { jobId } = req.params;
  const companyId = req.company.companyId;

  const job = await Job.findOneAndUpdate(
    {
      _id: jobId,
      createdBy: companyId,
    },
    req.body,
    { new: true, runValidators: true }
  );

  if (!job) {
    return res.status(404).json("no job with this id");
  }

  res.status(200).json({ job });
};

module.exports = {
  createJob,
  getAllCompanyJobs,
  getAllJobs,
  deleteJob,
  getJob,
  updateJob,
};
