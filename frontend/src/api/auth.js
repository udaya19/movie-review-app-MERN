import client from "./client";

export const createUser = async (userInfo) => {
  try {
    const response = (await client.post("/users/create", userInfo)).data;
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const verifyUserEmail = async (userInfo) => {
  try {
    const response = (await client.post("/users/verify-email", userInfo)).data;
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const userSignIn = async (userInfo) => {
  try {
    const response = (await client.post("/users/login", userInfo)).data;
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getIsAuth = async (token) => {
  try {
    const response = await client.get("/users/is-auth", {
      headers: {
        Authorization: "Bearer " + token,
        accept: "application/json",
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};