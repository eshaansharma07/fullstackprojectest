import { v2 as cloudinary } from "cloudinary";

const isConfigured =
  process.env.CLOUDINARY_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET;

if (isConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
}

export const uploadBuffer = async (buffer, folder) => {
  if (!buffer) return "";

  if (!isConfigured) {
    return "";
  }

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder }, (error, result) => {
      if (error) return reject(error);
      resolve(result.secure_url);
    });

    stream.end(buffer);
  });
};
