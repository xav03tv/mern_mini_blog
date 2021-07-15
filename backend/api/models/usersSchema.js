const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-])?/,
  },
  pseudo: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
    default: "NEW_USER",
  },
  validateUser: {
    type: Boolean,
    required: true,
    default: false,
  },
  validationKey: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Users", usersSchema);
