import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { v4 as uuidv4 } from "uuid";
import users from "./users.json"; // directly importing the JSON file

// build adapter setting delay
const mock = new MockAdapter(axios, { delayResponse: 500 });

// should make it stop interfeering with other axios calls by default
mock.onAny("https://overpass-api.de/api/interpreter").passThrough();

// --- GET ALL USERS
mock.onGet("/users").reply(() => {
  const cleanUsers = users.map((u) => {
    return { ...u, password: "", sessionToken: "" };
  });
  return [200, cleanUsers];
});

// --- GET USER BY ID
mock.onGet().reply((config) => {
  if (config.url.startsWith("/users/")) {
    // splits url and grabs last segment as the id
    const urlParts = config.url.split("/");
    const id = urlParts.at(-1);

    const user = users.find((u) => u.id === id);
    if (!user) {
      return [404, { error: "user not found" }];
    }

    return [200, user];
  }
});

// --- REGISTER NEW USER
mock.onPost("/register").reply(async (config) => {
  try {
    const { username, email, password, fullname, age, gender, picture } =
      JSON.parse(config.data);

    // checks for req fields
    if (!username || !fullname || !email || !password) {
      return [400, { error: "missing fields" }];
    }

    // username and email need to be unique
    const userAlreadyExists = users.find(
      (u) => u.username === username || u.email == email
    );

    if (userAlreadyExists) {
      return [400, { error: "uname and email must be unique" }];
    }

    // hashing pswd conceptual demo
    const hashedPswd = (pswd) => `hash_${pswd}`;

    // create new usr object:
    const newUser = {
      id: uuidv4(),
      username,
      email,
      fullname: fullname || "",
      password: hashedPswd,
      age: age || null,
      gender: gender || "",
      picture: picture || "",
      favoriteFruits: [],
      fruitBasket: [],
      friendsList: [],
      sessionToken: "",
    };

    // add to fake db
    users.push(newUser);

    // returns newuser as std
    return [201, { ...newUser, password: "" }];
  } catch (e) {
    return [500, { error: "server error" }];
  }
});

// --- USER LOGIN
mock.onPost("/login").reply(async (config) => {
  try {
    const { username, password } = JSON.parse(config.data);

    // search for user
    const user = users.find((u) => u.username === username);
    // usr not in the db
    if (!user) return [401, { error: "invalid uname or pswd" }];

    // -- user found

    // compare psw and hash
    const pswdMatch = hashedPswd(password) === user.password;
    if (!pswdMatch) return [401, { error: "invalid username or password" }];

    // -- pswd and hash matches

    // creates new session token add to usr object
    const token = uuidv4();
    user.sessionToken = token;

    //
    return [
      200,
      {
        ...user,
        password: "",
      },
    ];
  } catch (error) {
    return [500, { error: "server error" }];
  }
});

// UPDATE USER INFO
mock.onPost("/update").reply((config) => {
  try {
    const user = JSON.parse(config.data);

    // grabs user by token
    let userFound = users.find((u) => u.sessionToken === user.sessionToken);

    // usr not in the db
    if (!userFound)
      return [401, { error: "unauthorized: token missing or invalid" }];

    // user found now perform consistency checks:
    // checks for req fields
    if (!user.username || !user.fullname || !user.email) {
      return [400, { error: "missing fields" }];
    }

    // username and email need to be unique, prevents including the same user
    const userAlreadyExists = users.find(
      (u) =>
        (u.username === user.username || u.email === user.email) &&
        u.id !== userFound.id
    );
    if (userAlreadyExists) {
      return [400, { error: "uname and email must be unique" }];
    }

    // -- user found to be unique: replaces user
    userFound = {
      ...user,
      password: user.password ? user.password : userFound.password,
    };
    return [200, { ...userFound, password: "" }];
  } catch (error) {
    return [500, { error: "server error" }];
  }
});

// DELETE USER
mock.onPost("/delete").reply((config) => {
  try {
    const token = config.headers.Authorization;

    // grabs user by token
    const userToDelete = users.find((u) => u.sessionToken === token);
    if (!userToDelete) {
      return [401, { error: "unauthorized: token missing or invalid" }];
    }

    // del user from fake db
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === userToDelete.id) {
        users.splice(i, 1);
        break;
      }
    }

    return [
      200,
      {
        message: "accound deleted",
        user: { ...userToDelete, password: "", sessionToken: "" },
      },
    ];
  } catch (error) {
    return [500, { error: "server error" }];
  }
});
