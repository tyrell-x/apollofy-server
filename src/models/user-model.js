const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const { isEmail } = require("validator");

const UserSchema = Schema(
  {
    // we use the uid from firebase as the _id
    _id: String,
    firstName: {
      type: String,
      trim: true,
    },
    familyName: {
      type: String,
      trim: true,
    },
    locale: {
      type: String,
      trim: true,
    },
    pictureUrl: {
      type: String,
      trim: true,
    },
    phoneNumer: {
      type: Number,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "The email is required"],
      trim: true,
      unique: true,
      validate: {
        validator: (value) => isEmail(value),
        message: (props) => `The email ${props.value} is not valid`,
      },
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("user", UserSchema);

module.exports = User;
