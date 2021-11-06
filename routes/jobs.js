const express = require("express");

const router = express.Router();

const auth = require("../middleware/authentication");

const {
  createJob,
  getAllCompanyJobs,
  getAllJobs,
  deleteJob,
  getJob,
  updateJob,
} = require("../controllers/jobs.controller");

router.get("/all", getAllJobs);
router.get("/company/:companyId", getAllCompanyJobs);
router.post("/", auth, createJob);
router.get("/:jobId", getJob);
router.delete("/:jobId", auth, deleteJob);
router.patch("/:jobId", auth, updateJob);

module.exports = router;
