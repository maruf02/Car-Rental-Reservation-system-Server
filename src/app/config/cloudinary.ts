import axios from "axios";
import multer from "multer";
import path from "path";
import fs from "fs";

const upload = multer({ dest: "uploads/" }); // Temp directory to store uploaded files

// Function to upload image to ImgBB
const uploadToImgBB = async (filePath: string): Promise<string> => {
  const apiKey = process.env.IMGBB_API_KEY; // Ensure this is set in your environment variables
  const url = "https://api.imgbb.com/1/upload";

  const formData = new FormData();
  formData.append("image", fs.createReadStream(filePath));
  formData.append("key", apiKey);

  try {
    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.data.url; // This URL will be the link to the uploaded image
  } catch (error) {
    console.error("Error uploading image to ImgBB:", error);
    throw error;
  }
};

export { upload, uploadToImgBB };
