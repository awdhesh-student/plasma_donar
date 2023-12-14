const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  registerController,
  loginController,
  requestDonateController,
  getAllDonationController,
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.post("/requestfordonate",authMiddleware, requestDonateController);

router.get("/getallrequest",authMiddleware, getAllDonationController);

module.exports = router;
