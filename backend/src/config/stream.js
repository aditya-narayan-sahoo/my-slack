import ENV from "./env.js";
import { StreamChat } from "stream-chat";

const streamClient = new StreamChat(ENV.STREAM_API_KEY, ENV.STREAM_API_SECRET);

/**
 * Upserts a user in Stream.
 *
 * @param {Object} userData - The data to upsert for the user. At a minimum, this should contain a unique `id` and a `name`.
 * @returns {Promise<Object>} Resolves with the upserted user data if successful, or `undefined` if there was an error.
 */
const upsertStreamUser = async (userData) => {
  try {
    await streamClient.upsertUsers(userData);
    console.log(`Stream user upserted successfully: ${userData.name}`);
    return userData;
  } catch (error) {
    console.log(`Error upserting Stream user: ${error}`);
  }
};

/**
 * Deletes a user from Stream.
 *
 * @param {string} userId - The ID of the user to delete
 * @returns {Promise<void>} Resolves if the deletion was successful, or rejects if there was an error
 */
const deleteStreamUser = async (userId) => {
  try {
    await streamClient.deleteUser(userId);
    console.log(`Stream user deleted successfully: ${userId}`);
  } catch (error) {
    console.log(`Error deleting Stream user: ${error}`);
  }
};

/**
 * Generates a Stream token for the given user ID.
 *
 * @param {string|number} userId - The ID of the user to generate the token for
 * @returns {string|null} The generated Stream token if successful, or `null` if there was an error
 */
const generateStreamToken = (userId) => {
  try {
    const userIdString = userId.toString();
    return streamClient.createToken(userIdString);
  } catch (error) {
    console.log(`Error generating Stream token: ${error}`);
    return null;
  }
};

export { upsertStreamUser, deleteStreamUser, generateStreamToken };
