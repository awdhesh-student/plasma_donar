const mongoose = require("mongoose");

const donationRequestModal = mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    fullName: {
      type: String,
      required: [true, "name is required"],
    },
    phone: {
      type: Number,
      required: [true, "phone is required"],
    },
    address: {
      type: String,
      required: [true, "address is required"],
    },
    bloodGroup: {
      type: String,
      required: [true, "BG is required"],
    },
    timings: {
      type: Object,
      required: [true, "date Time required"],
    },
    minorHealthIssue: {
      type: String,
      required: [true, "minor health issue required"],
    },
    quantity: {
      type: Number,
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const donationRequestSchema = mongoose.model(
  "donationRequest",
  donationRequestModal
);

module.exports = donationRequestSchema;
