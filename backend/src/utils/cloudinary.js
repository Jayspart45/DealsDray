import { v2 as cloudinary } from "cloudinary";
import { error, log } from "console";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
  }
};

const deleteOnCloudinary = async (cloudinaryPath) => {
  try {
    console.log(cloudinaryPath);
    await cloudinary.uploader.destroy(
      cloudinaryPath.split("/")[7].split(".")[0],
      function (error, result) {
        console.log(result, error);
      }
    );
  } catch (error) {
    console.log("Error while delete the file in cloudinary", error);
  }
};
export { uploadOnCloudinary, deleteOnCloudinary };
