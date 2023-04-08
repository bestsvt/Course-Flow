import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";

const cloudinaryUpload = async (file) => {
  
  const result = await cloudinary.uploader.upload(file.profile_image[0].path, {
      folder: "courseFlow",
      type: "private",
    });

  const fileUrl = {
      url: result.secure_url,
      publicId: result.public_id,
    };
    await fs.unlink(file.profile_image[0].path);
  return fileUrl;
};

export { cloudinaryUpload };