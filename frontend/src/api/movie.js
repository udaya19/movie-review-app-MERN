import client from "./client";
export const uploadTrailer = async (formData) => {
  const token = localStorage.getItem("auth-token");
  try {
    const { data } = client.post("/movies/upload-trailer", formData, {
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
