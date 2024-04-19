import mongoose, { Schema } from "mongoose";

const employeeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    designation: {
      type: String,
      default: "Sales",
      enum: ["HR", "Manager", "Sales"],
      required: true,
    },
    gender: {
      type: String,
      default: "Male",
      enum: ["Male", "Female"],
    },
    course: {
      type: [String],
      enum: ["MCA", "BCA", "BSC"],
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Employee = mongoose.model("Employee", employeeSchema);
