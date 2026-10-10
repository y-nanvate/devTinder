const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 18,
      max: 60,
    },
    skills: {
      type: [String],
      default: ["cricket", "batting", "boling"],
    },
    gender: {
      type: String,
      validate(value) {
        if (!['male', 'female', 'others'].includes(value)) {
          throw new Error("Gender not Valid");
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;