// services.js — API layer: all requests to the backend go through here, keep app highly modular and easily readable
// importing controllers.js activates the axios-mock-adapter, intercepting all axios calls
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

// --- USDA API (not in use) ---
// instead of fetching live, fruit data is bundled locally as fruitsList.json
// searchFruit shows how a live search would work if an API key were provided
const apiKey = "MY_API_KEY";

// example: search USDA FoodData Central for a fruit by name
export const searchFruit = async (fruitName) => {
  const url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${apiKey}&query=${fruitName}&dataType=Foundation`;
  const response = await axios.get(url);
  return response.data;
};
