const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = require("../schemas/userModel");
const donationRequestSchema = require("../schemas/donationRequestModel");

//////////for registering/////////////////////////////
const registerController = async (req, res) => {
  try {
    const existsUser = await userSchema.findOne({ email: req.body.email });
    if (existsUser) {
      return res
        .status(200)
        .send({ message: "User already exists", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;

    const newUser = new userSchema(req.body);
    await newUser.save();

    return res.status(201).send({ message: "Register Success", success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: `${error.message}` });
  }
};

////for the login//////////////////
const loginController = async (req, res) => {
  try {
    const user = await userSchema.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User not found", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invalid email or password", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
      expiresIn: "1d",
    });
    user.password = undefined;
    return res.status(200).send({
      message: "Login success successfully",
      success: true,
      token,
      userData: user,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: `${error.message}` });
  }
};

////for the request of donation//////////////////
const requestDonateController = async (req, res) => {
  const { userId, timings } = req.body;
  try {
    const actualTime = timings.map((time) => new Date(time).toLocaleString());
    const request = new donationRequestSchema({
      ...req.body,
      userID: userId.toString(),
      timings: actualTime,
    });

    await request.save();

    return res.status(200).send({
      success: true,
      message: "request for donating is sent successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: `${error.message}` });
    console.log(error);
  }
};

////for the request of donation to user//////////////////
const getAllDonationController = async (req, res) => {
  const { userId } = req.body;
  try {
    const allRequest = await donationRequestSchema.find({
      userID: userId,
    });

    if (!allRequest) {
      return res.status(404).send({
        success: false,
        message: "No requests found",
      });
    }
    return res.status(200).send({
      success: true,
      data: allRequest,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: `${error.message}` });
    console.log(error);
  }
};

module.exports = {
  registerController,
  loginController,
  requestDonateController,
  getAllDonationController,
};
