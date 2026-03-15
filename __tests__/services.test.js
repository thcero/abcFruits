import {
  registerUser,
  loginUser,
  logoutUser,
  deleteUser,
  updateUser,
} from "../services";
import { initializeSimDB } from "../backend/controllers";
import AsyncStorage from "@react-native-async-storage/async-storage";

// as some tests make multiple requests, add extra time out as mock 500ms dealys per req
jest.setTimeout(17000);

beforeEach(async () => {
  await AsyncStorage.clear();
  await initializeSimDB();
});

// --- User account tests: registration, login, logout, deletion

test("user registers successfully", async () => {
  const newUser = {
    username: "user1",
    email: "user1@gmail.com",
    password: "123456",
    fullname: "user1 user",
    country: "United Kingdom",
  };
  const result = await registerUser(newUser);
  expect(result).toBeDefined();
  expect(result.username).toBe("user1");
  expect(result.password).toBe("");
});

test("user logins successfully", async () => {
  await registerUser({
    username: "user1",
    email: "user1@gmail.com",
    password: "123456",
    fullname: "user1 user",
    country: "United Kingdom",
  });
  const result = await loginUser({ username: "user1", password: "123456" });
  expect(result).toBeDefined();
  expect(result.username).toBe("user1");
  expect(result.sessionToken).toBeTruthy();
});

test("user logs out successfully", async () => {
  await registerUser({
    username: "user1",
    email: "user1@gmail.com",
    password: "123456",
    fullname: "user1 user",
    country: "United Kingdom",
  });
  const loggedIn = await loginUser({ username: "user1", password: "123456" });
  const result = await logoutUser(loggedIn);
  expect(result).toBeDefined();
  expect(result.sessionToken).toBe("");
});

test("user account deletion succeeds", async () => {
  await registerUser({
    username: "user1",
    email: "user1@gmail.com",
    password: "123456",
    fullname: "user1 user",
    country: "United Kingdom",
  });
  const loggedIn = await loginUser({ username: "user1", password: "123456" });
  const result = await deleteUser(loggedIn);
  expect(result).toBeDefined();
  expect(result.message).toBe("accound deleted");
});

// --- Friends tests: adding and removing friends

test("user can add a friend", async () => {
  await registerUser({
    username: "user1",
    email: "user1@gmail.com",
    password: "123456",
    fullname: "user1 user",
    country: "United Kingdom",
  });
  await registerUser({
    username: "user2",
    email: "user2@gmail.com",
    password: "123456",
    fullname: "user2 user",
    country: "Brazil",
  });
  const loggedIn = await loginUser({ username: "user1", password: "123456" });
  const result = await updateUser({
    ...loggedIn,
    friendsList: [...loggedIn.friendsList, "user2"],
  });
  expect(result.friendsList).toContain("user2");
});

test("user can remove a friend", async () => {
  await registerUser({
    username: "user1",
    email: "user1@gmail.com",
    password: "123456",
    fullname: "user1 user",
    country: "United Kingdom",
  });
  await registerUser({
    username: "user2",
    email: "user2@gmail.com",
    password: "123456",
    fullname: "user2 user",
    country: "Brazil",
  });
  const loggedIn = await loginUser({ username: "user1", password: "123456" });
  const withFriend = await updateUser({
    ...loggedIn,
    friendsList: ["user2"],
  });
  const result = await updateUser({
    ...withFriend,
    friendsList: [],
  });
  expect(result.friendsList).not.toContain("user2");
});

// --- Validation tests: registration and login error handling

test("registration fails with no username provided", async () => {
  await expect(
    registerUser({
      username: "",
      email: "user1@gmail.com",
      password: "123456",
      fullname: "user1 user",
      country: "United Kingdom",
    }),
  ).rejects.toThrow();
});

test("registration fails with no email provided", async () => {
  await expect(
    registerUser({
      username: "user1",
      email: "",
      password: "123456",
      fullname: "user1 user",
      country: "United Kingdom",
    }),
  ).rejects.toThrow();
});

test("login fails with wrong password", async () => {
  await registerUser({
    username: "user1",
    email: "user1@gmail.com",
    password: "123456",
    fullname: "user1 user",
    country: "United Kingdom",
  });
  await expect(
    loginUser({ username: "user1", password: "wrongpassword" }),
  ).rejects.toThrow();
});

test("registration fails when username is already taken", async () => {
  await registerUser({
    username: "user1",
    email: "user1@gmail.com",
    password: "123456",
    fullname: "user1 user",
    country: "United Kingdom",
  });
  await expect(
    registerUser({
      username: "user1",
      email: "user1@gmail.com",
      password: "123456",
      fullname: "user1 user",
      country: "United Kingdom",
    }),
  ).rejects.toThrow();
});
