import { Employee } from "../model/employee.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { deleteOnCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";

export const registerEmployee = asyncHandler(async (req, res) => {
  const { name, email, mobile, designation, gender, course } = req.body;
  if (!name || !email || !mobile || !designation || !gender || !course) {
    throw new ApiError(400, "All Fields Must be Provided");
  }
  const existedEmployee = await Employee.findOne({
    $or: [{ name }, { email }],
  });
  if (existedEmployee)
    throw new ApiError(400, "Employee with name or email already exists");
  const avatarLocalPath = req.file?.path;
  if (!avatarLocalPath) new ApiError(400, "Avatar File is required");
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const employee = await Employee.create({
    name,
    email,
    mobile,
    designation,
    gender,
    course,
    avatar: avatar.url,
  });
  const createdEmployee = await Employee.findById(employee._id).select(
    "-password -refreshToken"
  );
  if (!createdEmployee)
    throw new ApiError(500, "Something went wrong while creating Employee");
  return res
    .status(200)
    .json(
      new ApiResponse(200, createdEmployee, "Employee Created Successfully")
    );
});

export const updateEmployee = asyncHandler(async (req, res) => {
  const { name, email, mobile, designation, gender, course } = req.body;
  if ((!name || !email, !mobile || !designation || !gender || !course)) {
    throw new ApiError(400, "All Fields Must be Provided");
  }

  const updatedEmployee = await Employee.findOneAndUpdate(
    { email: email },
    {
      $set: {
        name,
        email,
        mobile,
        designation,
        gender,
        course,
      },
    },
    { new: true }
  );
  res
    .status(200)
    .json(new ApiResponse(201, updatedEmployee, "Employee Updated"));
});

export const deleteEmployee = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const employee = await Employee.findById(id);
  await deleteOnCloudinary(employee.avatar);
  await Employee.findByIdAndDelete(id, { new: true });
  const updatedEmployee = await Employee.find();
  if (!updatedEmployee)
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "No, Employees to show"));
  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedEmployee, "Employee Deleted Successfully")
    );
});

export const getAllEmployee = asyncHandler(async (req, res) => {
  const employeeDetails = await Employee.find();
  if (!employeeDetails)
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "No, Employees to show"));
  return res
    .status(200)
    .json(new ApiResponse(200, employeeDetails, "Employee Details Fetched"));
});

export const updatedEmployeeAvatar = asyncHandler(async (req, res) => {
  const localFilePath = req.file?.path;
  const { id } = req.body;
  const employee = await Employee.findById(id);
  await deleteOnCloudinary(employee.avatar);
  if (!localFilePath) throw new ApiError(400, "Avatar file is missinng");
  const avatar = await uploadOnCloudinary(localFilePath);
  if (!avatar.url) throw new ApiError(400, "Error while uploading avatar");
  const updatedEmployee = await Employee.findByIdAndUpdate(
    id,
    {
      $set: {
        avatar: avatar.url,
      },
    },
    { new: true }
  );
  if (!updatedEmployee)
    throw new ApiError(500, "Something went wrong while updating avatar");
  return res
    .status(200)
    .json(new ApiResponse(201, updatedEmployee, "Avatar updated successfully"));
});
