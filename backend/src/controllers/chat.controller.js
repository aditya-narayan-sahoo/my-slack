import { generateStreamToken } from "../config/stream.js";

/**
 * Returns a Stream token for the currently authenticated user.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Resolves with a JSON response containing the Stream token
 * @throws If there is an error generating the Stream token, a 500 error is thrown
 */
export const getStreamToken = (req, res) => {
  try {
    const token = generateStreamToken(req.auth().userId);
    res.status(200).json({ token });
  } catch (error) {
    console.log(`Error generating Stream token: ${error}`);
    res.status(500).json({ message: "Failed to generate Stream token" });
  }
};
