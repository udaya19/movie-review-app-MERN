import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { uploadTrailer } from "../../api/movie";
import MovieForm from "./MovieForm";

const MovieUpload = () => {
  const [videoSelected, setVideoSelected] = useState(false);
  const [videoUploaded, setVideoUploaded] = useState(false);
  const [videoInfo, setVideoInfo] = useState({});
  const [uploadProgress, setUploadProgress] = useState(0);
  const handleTypeError = (error) => {
    console.log(error);
  };
  const handleChange = (file) => {
    console.log(file);
    const formData = new FormData();
    formData.append("video", file);
    setVideoSelected(true);
    handleUploadTrailer(formData);
  };
  const handleUploadTrailer = async (data) => {
    const { error, url, public_id } = await uploadTrailer(
      data,
      setUploadProgress
    );
    if (!error) {
      setVideoUploaded(true);
      setVideoInfo({ url, public_id });
    }
  };
  const getUploadProgressValue = () => {
    if (!videoUploaded && uploadProgress >= 100) {
      return "Processing";
    }
    return `Upload progress ${uploadProgress}`;
  };
  console.log(videoInfo);
  return (
    <div className="dark:text-white dark:bg-white dark:bg-opacity-50 test-primary fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
      <div className="dark:bg-primary bg-white rounded w-[45rem] h-[40rem] overflow-auto">
        {/* <UploadProgress
          visible={!videoUploaded && videoSelected}
          message={getUploadProgressValue()}
          width={uploadProgress}
        />
        <TrailerSelector
          visible={!videoSelected}
          onTypeError={handleTypeError}
          handleChange={handleChange}
        /> */}
        <MovieForm />
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

const UploadProgress = ({ message, width, visible }) => {
  if (!visible) return null;
  return (
    <div className="p-2">
      <div className=" dark:bg-secondary bg-white drop-shadow-lg rounded p-3">
        <div className="relative h-3 dark:bg-dark-subtle bg-light-subtle overflow-hidden">
          <div
            style={{ width: width + "%" }}
            className="h-full absolute dark:bg-white bg-secondary "
          ></div>
        </div>
        <p className="font-semibold dark:text-dark-subtle text-light-subtle animate-pulse mt-1">
          {message}
        </p>
      </div>
    </div>
  );
};

export default MovieUpload;
