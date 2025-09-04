/**
 * Protect route middleware.
 *
 * Checks if a user is authenticated before allowing the request to proceed.
 * If the user is not authenticated, it returns a 401 Unauthorized response.
 *
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {NextFunction} next Express next middleware function
 */
export const protectRoute = (req, res, next) => {
  if (!req.auth().isAuthenticated) {
    return res
      .status(401)
      .json({ message: "Unauthorized - you must be logged in" });
  }
  next();
};
