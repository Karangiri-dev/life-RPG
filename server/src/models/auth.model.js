import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    refreshToken: {
      type: String,
      default: "",
    },

    level: {
      type: Number,
      default: 1,
    },

    xp: {
      type: Number,
      default: 0,
    },

    gold: {
      type: Number,
      default: 0,
    },

    streak: {
      type: Number,
      default: 0,
    },

    attributes: {
      strength: {
        type: Number,
        default: 70,
      },

      intelligence: {
        type: Number,
        default: 65,
      },

      discipline: {
        type: Number,
        default: 80,
      },

      health: {
        type: Number,
        default: 70,
      },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;