const donationRequestSchema = require("../schemas/donationRequestModel");

const getAllRequestController = async (req, res) => {
  try {
    const allRequest = await donationRequestSchema.find();

    if (!allRequest) {
      return res.status(404).json({
        success: false,
        message: "No request found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Requests found",
      data: allRequest,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: `${error.message}` });
  }
};

const changeStatusController = async (req, res) => {
  const { requestId } = req.params;
  const { status } = req.body;
  try {
    const request = await donationRequestSchema.findByIdAndUpdate(
      requestId,
      {
        status: status,
      },
      {
        new: true,
      }
    );

    if (!request) {
      return res.status(400).send({
        success: false,
        message: "somthing went wrong",
      });
    }
    return res
      .status(200)
      .send({ success: true, message: "Request status updated" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: `${error.message}` });
  }
};

module.exports = {
  getAllRequestController,
  changeStatusController,
};
