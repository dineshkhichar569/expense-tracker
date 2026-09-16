/**
 * Handles request when the Route does not exist
 * and should be added at the end of all routes
 * @param {Request} req the request from the user
 * @param {Response} res the response to the user
 * @param {Function} next passes control to next
 */
export const notFound = (req, res, next) => {
  return res.status(404).json({
    success: false,
    message: `Route not found : ${req.originalUrl}`,
  });
};
