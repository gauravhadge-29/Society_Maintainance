import cloudinary from "../config/cloudinary.js";
import ApiError from "./ApiError.js";

const uploadOnCloudinary = async (fileBuffer) => {
  return new Promise((resolve, reject) => {
    if (!fileBuffer) return resolve(null);

    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      (error, result) => {
        if (error) {
          console.error("☁️ [Cloudinary Upload Error]:", error);
          
          if (error.http_code === 403 || error.http_code === 401) {
             return reject(new ApiError(500, "Cloudinary upload failed: Invalid API credentials or Cloud Name. Please check your .env file."));
          }
          
          return reject(new ApiError(500, "Failed to upload image to Cloudinary"));
        } else {
          resolve(result);
        }
      }
    );

    uploadStream.end(fileBuffer);
  });
};

export { uploadOnCloudinary };

