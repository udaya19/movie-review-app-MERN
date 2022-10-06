import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { uploadTrailer } from "../../api/movie";

const MovieUpload = () => {
  const [videoSelected, setVideoSelected] = useState(true);
  const handleTypeError = (error) => {
    console.log(error);
  };
  const handleChange = async (file) => {
    console.log(file);
    const formData = new FormData();
    formData.append("video", file);
    const res = await uploadTrailer(formData);
    console.log(res);
  };
  return (
    <div className="dark:text-white dark:bg-white dark:bg-opacity-50 test-primary fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
      <div className="dark:bg-primary bg-white rounded w-[45rem] h-[40rem] overflow-auto">
        <TrailerSelector
          visible={!videoSelected}
          onTypeError={handleTypeError}
          handleChange={handleChange}
        />
      </div>
    </div>
  );
};

const TrailerSelector = ({ visible, handleChange, onTypeError }) => {
  if (!visible) return null;
  return (
    <div className="h-full flex items-center justify-center">
      <FileUploader
        name="file"
        handleChange={handleChange}
        onTypeError={onTypeError}
        types={["mp4", "avi"]}
      >
        <div className="cursor-pointer w-60 h-60 border border-dashed dark:border-dark-subtle border-light-subtle rounded-full flex flex-col items-center justify-center dark:text-dark-subtle text-secondary ">
          <AiOutlineCloudUpload size={80} />
          <p>Drag and drop your files here</p>
        </div>
      </FileUploader>
    </div>
  );
};

export default MovieUpload;
