import multer from "multer";

const storage = multer.memoryStorage();

const createUploader = (type) => {
  const fileFilter = (req, file, cb) => {
    const imageTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    const pdfType = "application/pdf";

    if (type === "image" && imageTypes.includes(file.mimetype)) {
      cb(null, true);
    } else if (type === "pdf" && file.mimetype === pdfType) {
      cb(null, true);
    } else {
      const message =
        type === "image"
          ? "Недопустимий формат файлу. Дозволені: jpg, jpeg, png, webp"
          : "Лише PDF-файли дозволені";
      cb(new Error(message), false);
    }
  };

  return multer({
    storage,
    fileFilter,
    limits: type === "pdf" ? { fileSize: 5 * 1024 * 1024 } : undefined,
  });
};

export const uploadAvatar = createUploader("image");
export const uploadCV = createUploader("pdf");
export const uploadImage = createUploader("image");
