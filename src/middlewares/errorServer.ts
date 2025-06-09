import createHttpError from "http-errors";

export const errorServer = (error, _req, res, _next) => {
  if (createHttpError.isHttpError(error)) {
    return res
      .status(error.status)
      .json({ status: error.status, message: error.message });
  }

  console.error("Unexpected error:", error);

  res.status(500).json({ status: 500, message: "Internal server error" });
};
