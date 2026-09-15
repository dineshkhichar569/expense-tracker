const errorHandler = (error, req, res, next) => {
  if (error == "ValidationError") {
    const message = Object.values(error, errors)[0];

    return res.status(400).json({
      success: false,
      message,
    });
  }

  console.error(error);

  return res.status(500).json({
    success: false,
    message: "Server Error",
  });
};

export default errorHandler;
