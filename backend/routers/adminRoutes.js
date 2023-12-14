const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getAllRequestController,
  changeStatusController,
} = require("../controllers/adminController");

const router = express.Router();

router.get("/getallrequest", authMiddleware, getAllRequestController);

router.post("/allotdoc/:requestId", authMiddleware, changeStatusController);

module.exports = router;
