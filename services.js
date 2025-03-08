// these functions are the requests to our controllers, implemented in this file for cleaner code with the interaction with
// separation of concearns
import "./backend/controllers.js";
import axios from "axios";

// REGISTERS NEW USER: expect obj in the format:
// { username, email, password, fullname, age, gender, picture }
// receives back full user obj with no token
export const registerUser = async (userData) => {
  const response = await axios.post("/register", userData);
  return response.data;
};

// LOGS IN expects:  { username, password },
// receives back full usr obj with token
export const loginUser = async (credentials) => {
  const response = await axios.post("/login", credentials);
  return response.data;
};

// GET ALL USERS all the users to display
export const getAllUsers = async () => {
  const response = await axios.get("/users");
  return response.data;
};

// --- UPDATES USER, expects full user obj incl sessionToken and password optional
// receives back a updated obj with sessionToken
export const updateUser = async (userData) => {
  const response = await axios.post("/update", userData);
  return response.data;
};

// --- DELETES USER
// grab token from user and just send token and delete correspondent user
export const deleteUser = async (userData) => {
  const sessionToken = userData.sessionToken;
  const config = {
    headers: { Authorization: sessionToken },
  };
  const response = await axios.post("/delete", {}, config);
  return response.data;
};
