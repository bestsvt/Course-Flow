import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";

const cloudinaryUpload = async (file, imageStatus) => {
  try {
    let result;
    if (imageStatus === "upload") {
      result = await cloudinary.uploader.upload(file.path, {
        folder: "courseFlow",
        type: "private",
      })
      await fs.unlink(file.path);
    } else if (imageStatus === "delete") {
      await cloudinary.uploader.destroy(file.public_id, {
        type: "private"
      });
    } else {
      throw new Error("Invalid Image Status");
    }
    return result;
  } catch (error) {
    console.log("Cloudinary Error:", error);
  }
};

export { cloudinaryUpload };
