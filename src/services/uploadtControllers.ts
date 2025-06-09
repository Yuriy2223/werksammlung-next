export const uploadAvatarController = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file provided" });
  }

  req.profile.avatarUrl = {
    data: req.file.buffer,
    contentType: req.file.mimetype,
    filename: req.file.originalname,
  };

  await req.profile.save();

  res.status(200).json({
    message: "Avatar uploaded successfully",
    user: {
      ...req.profile.toObject(),
      avatarUrl: `/api/uploads/avatar/${req.profile._id}`,
    },
  });
};
//  Повертаємо тільки URL до аватарки
// export const uploadAvatarController = async (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ message: "No file provided" });
//   }

//   req.profile.avatarUrl = {
//     data: req.file.buffer,
//     contentType: req.file.mimetype,
//     filename: req.file.originalname,
//   };

//   await req.profile.save();

//   res.status(200).json({
//     message: "Avatar uploaded successfully",
//     user: req.profile.toJSON(),
//   });
// };

export const getAvatarController = async (req, res) => {
  const { avatarUrl } = req.profile;

  if (!avatarUrl || !avatarUrl.data) {
    return res.status(404).json({ message: "Avatar not found" });
  }

  res.set("Content-Type", avatarUrl.contentType);
  res.send(avatarUrl.data);
};
//  Повертаємо тільки URL до аватарки
// export const getAvatarController = async (req, res) => {
//   const { avatarUrl } = req.profile;

//   if (!avatarUrl || !avatarUrl.data) {
//     return res.status(404).json({ message: "Avatar not found" });
//   }

//   res.set("Content-Type", avatarUrl.contentType);
//   res.set("Content-Disposition", `inline; filename="${avatarUrl.filename}"`);
//   res.send(avatarUrl.data);
// };

export const uploadCVController = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No PDF file provided" });
  }

  if (req.file.mimetype !== "application/pdf") {
    return res.status(400).json({ message: "Only PDF files are allowed" });
  }

  req.profile.viewCV = {
    data: req.file.buffer,
    contentType: req.file.mimetype,
    filename: req.file.originalname,
  };

  await req.profile.save();

  res.status(200).json({
    message: "CV uploaded successfully",
    user: req.profile.toJSON(),
  });
};

export const getCVController = async (req, res) => {
  const { viewCV } = req.profile;

  if (!viewCV?.data) {
    return res.status(404).json({ message: "CV not found" });
  }

  res.set("Content-Type", viewCV.contentType);
  res.set("Content-Disposition", `inline; filename="${viewCV.filename}"`);
  res.send(viewCV.data);
};
