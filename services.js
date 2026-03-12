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

// --- LOGS OUT USER
// grab token from user and just send token and delete correspondent user
export const logoutUser = async (userData) => {
  const sessionToken = userData.sessionToken;
  const config = {
    headers: { Authorization: sessionToken },
  };
  const response = await axios.post("/logout", {}, config);
  return response.data;
};

// --- AUTHENTICATE USER
// grab token from user and just send token
export const authenticateUser = async (userData) => {
  const sessionToken = userData.sessionToken;
  const config = {
    headers: { Authorization: sessionToken },
  };
  const response = await axios.post("/authenticate", {}, config);
  return response.data;
};

// This part of the code is not in use as it requires API key,
// there it only servers as an example of how it'd be implemented if
// users were to make a request by clicking on a fruit icon or searching for a fruit,
// as the info is not large, or sensitive time sensitive, I decided to access the API
// myself and post the json info list with the app as an example
// Replace with your actual USDA API key
const apiKey = "MY_API_KEY";

// function to seach for fruits, like so:GET
//api.nal.usda.gov/fdc/v1/foods/search?api_key=YOUR_API_KEY&query=banana&dataType=Foundation
export const searchFruit = async (fruitName) => {
  const url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=YOUR_API_KEY&query=${fruitName}&dataType=Foundation`;
  const response = await axios.get(url);
  return response.data;
};
