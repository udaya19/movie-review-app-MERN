import client from "./client";
export const uploadTrailer = async (formData, onUploadProgress) => {
  const token = localStorage.getItem("auth-token");
  try {
    const { data } = client.post("/movies/upload-trailer", formData, {
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "multipart/form-data",
      },
      onUploadProgress: ({ loaded, total }) => {
        if (onUploadProgress) {
          onUploadProgress(Math.floor((loaded / total) * 100));
        }
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
