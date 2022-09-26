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
