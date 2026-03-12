import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import initialUsersData from "./users.json"; // directly importing the JSON file
import AsyncStorage from "@react-native-async-storage/async-storage";

// build adapter setting delay
const mock = new MockAdapter(axios, { delayResponse: 500 });
// hashing pswd demo step
const hashedPswd = (pswd) => `hash_${pswd}`;

// should make it stop interfeering with other axios calls by default...
mock.onAny("https://overpass-api.de/api/interpreter").passThrough();

// --- GET ALL USERS
mock.onGet("/users").reply(async () => {
  const users = await getUsersDB();
  const cleanUsers = users?.map((u) => {
    return { ...u, password: "", sessionToken: "" };
  });
  return [200, cleanUsers];
});

// --- GET USER BY ID
mock.onGet().reply(async (config) => {
  if (config.url.startsWith("/users/")) {
    // splits url and grabs last segment as the id
    const urlParts = config.url.split("/");
    const id = urlParts.at(-1);

    const users = await getUsersDB();
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
    const { username, email, password, fullname, picture, country } =
      JSON.parse(config.data);

    // checks for req fields
    if (!username || !fullname || !email || !password) {
      return [400, { error: "missing fields" }];
    }

    const users = await getUsersDB();
    // username and email need to be unique
    const userAlreadyExists = users.find(
      (u) => u.username === username || u.email == email,
    );

    if (userAlreadyExists) {
      return [400, { error: "uname and email must be unique" }];
    }

    // create new usr object:
    const newUser = {
      id: `${Math.random()}`,
      username,
      email,
      fullname: fullname,
      country: country || "",
      password: hashedPswd(password),
      picture: picture || "",
      favouriteFruits: [],
      fruitBasket: [],
      friendsList: [],
      sessionToken: `${Math.random()}`,
    };

    // add to fake db
    users.push(newUser);

    writeUsersDB(users);

    // returns newuser as std
    return [201, { ...newUser, password: "" }];
  } catch (e) {
    return [500, { error: "server error", e }];
  }
});

// --- USER LOGIN
mock.onPost("/login").reply(async (config) => {
  try {
    const { username, password } = JSON.parse(config.data);

    const users = await getUsersDB();
    if (!users) return [401, { error: "no users database found" }];
    // search for user
    const user = users.find((u) => u.username === username);
    // usr not in the db
    if (!user) return [401, { error: "no user found" }];

    // -- user found

    // compare psw and hash
    const pswdMatch = hashedPswd(password) === user.password;
    if (!pswdMatch) return [401, { error: "invalid username or password" }];

    // -- pswd and hash matches

    // creates new session token add to usr object
    const token = `${Math.random()}`;
    user.sessionToken = token;

    await writeUsersDB(users);
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
mock.onPost("/update").reply(async (config) => {
  try {
    const user = JSON.parse(config.data);

    const users = await getUsersDB();

    // grabs user by token
    let uIndex = users.findIndex((u) => u.sessionToken === user.sessionToken);

    // usr not in the db
    if (uIndex === -1)
      return [
        401,
        { error: "/update: unauthorized: token missing or invalid" },
      ];

    // user found now perform consistency checks:
    // checks for req fields
    if (!user.username || !user.fullname || !user.email) {
      return [400, { error: "missing fields" }];
    }

    // username and email need to be unique, prevents including the same user
    const prevUserWithSameInfo = users.find(
      (u) =>
        (u.username === user.username || u.email === user.email) &&
        u.id !== users[uIndex].id,
    );
    if (prevUserWithSameInfo) {
      return [400, { error: "uname and email must be unique" }];
    }

    // -- user found to be unique: replaces user
    users[uIndex] = {
      ...user,
      password: user.password ? user.password : users[uIndex].password,
    };
    await writeUsersDB(users);
    return [200, { ...users[uIndex], password: "" }];
  } catch (error) {
    return [500, { error: "/update server error" }];
  }
});

// LOGOUT USER
mock.onPost("/logout").reply(async (config) => {
  try {
    const users = await getUsersDB();
    const token = config.headers.Authorization;

    // grabs user by token
    let uIndex = users.findIndex((u) => u.sessionToken === token);

    // usr not in the db
    if (uIndex === -1)
      return [
        401,
        { error: "/update: unauthorized: token missing or invalid" },
      ];

    // --- user found
    users[uIndex].sessionToken = "";
    await writeUsersDB(users);
    return [200, { ...users[uIndex], password: "" }];
  } catch (error) {
    return [500, { error: "/update server error" }];
  }
});

// DELETE USER
mock.onPost("/delete").reply(async (config) => {
  try {
    const users = await getUsersDB();
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
    writeUsersDB(users);
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

// AUTHENTICATE USER
mock.onPost("/authenticate").reply(async (config) => {
  try {
    const token = config.headers.Authorization;

    const users = await getUsersDB();
    // grabs user by token
    const userToAuth = users.find((u) => u.sessionToken === token);
    if (!userToAuth) {
      return [401, { error: "unauthorized: token missing or invalid" }];
    }

    return [200, { ...userToAuth, password: "" }];
  } catch (error) {
    return [500, { error: "server error" }];
  }
});

//-----------------------SIM DB ------------------------//
export const dbKey = "@usersSimDB";
// a simulated database initialization function, stores all data in a single json file to the local memory
// called by App.js
export const initializeSimDB = async (
  key = dbKey,
  userData = initialUsersData,
) => {
  try {
    const initialized = await AsyncStorage.getItem(key);
    if (!initialized) {
      // if not already 'installed', then start a fresh one with initial sample users file
      await AsyncStorage.setItem(key, JSON.stringify(userData));
    }
  } catch (e) {
    console.log(e);
  }
};

// grab json file from asyncStorage:
// 1) Read the current users from AsyncStorage
const getUsersDB = async (key = dbKey) => {
  try {
    const usJson = await AsyncStorage.getItem(key);
    return usJson ? JSON.parse(usJson) : [];
  } catch (e) {
    console.log(e);
  }
};

// write json file to asyncStorage:
const writeUsersDB = async (usArray, key = dbKey) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(usArray));
  } catch (e) {
    console.log(e);
  }
};
