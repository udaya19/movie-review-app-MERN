import React from "react";
import LiveSearch from "../LiveSearch";
import TagsInput from "../TagsInput";
import { commonInputClasses } from "../../utils/theme";
const MovieForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form action="" onSubmit={handleSubmit} className="flex space-x-3">
      <div className="w-[70%] h-5 space-y-5">
        <div>
          <Label htmlFor="title">Title</Label>
          <input
            id="title"
            placeholder="Movie Title"
            type="text"
            className={commonInputClasses + " border-b-2"}
          />
        </div>
        <div>
          <Label htmlFor="storyLine">Story Line</Label>
          <textarea
            id="storyLine"
            className={
              commonInputClasses +
              " resize-none border-b-2 dark:border-x-yellow-50 h-24"
            }
            placeholder="Movie Story"
          ></textarea>
        </div>
        <TagsInput />
        <LiveSearch />
      </div>
      <div className="w-[30%] h-5 "></div>
    </form>
  );
};

const Label = ({ children, htmlFor }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="dark:text-dark-subtle text-light-subtle font-semibold"
    >
      {children}
    </label>
  );
};

export default MovieForm;
