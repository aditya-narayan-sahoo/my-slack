import { generateStreamToken } from "../config/stream.js";

/**
 * Generates a Stream token for the user.
 *
 * @param {import("express").Request} req Express request object
 * @param {import("express").Response} res Express response object
 *
 * @returns {import("express").Response} The response object with
 * the generated Stream token.
 *
 * @throws {Error} If there was an error generating the Stream token
 */
export const getStreamToken = (req, res) => {
  try {
    const auth = req.auth?.();
    const userId = auth?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const token = generateStreamToken(userId);
    if (!token) {
      return res
        .status(500)
        .json({ message: "Failed to generate Stream token" });
    }
    res.set("Cache-Control", "no-store");
    return res.status(200).json({ token });
  } catch (error) {
    console.error("Error generating Stream token", error);
    return res.status(500).json({ message: "Failed to generate Stream token" });
  }
};
