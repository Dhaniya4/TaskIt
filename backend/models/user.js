import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
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
    },

    theme: {
      type: String,
      enum: ["light", "dark"],
      default: "dark",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema)