const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  msg: {
    type: String,
    required: true,
  },
});

exports = mongoose.model("emailSchema", emailSchema);
