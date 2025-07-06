import crypto from "crypto";

export const uploadImage = async (file: string): Promise<string | null> => {
  const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME!;
  const API_KEY = process.env.CLOUDINARY_API_KEY!;
  const API_SECRET = process.env.CLOUDINARY_API_SECRET!;

  const timestamp = Math.floor(Date.now() / 1000);
  const stringToSign = `timestamp=${timestamp}${API_SECRET}`;
  const signature = crypto
    .createHash("sha1")
    .update(stringToSign)
    .digest("hex");

  const formData = new URLSearchParams();
  formData.append("file", file);
  formData.append("api_key", API_KEY);
  formData.append("timestamp", String(timestamp));
  formData.append("signature", signature);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      }
    );

    if (!response.ok) throw new Error("Upload failed");

    const data = await response.json();
    return data.secure_url;
  } catch {
    return null;
  }
};
