import React from "react";

const MovieForm = () => {
  return (
    <form action="" className="flex space-x-3">
      <div className="w-[70%] h-5 ">
        <label
          htmlFor="title"
          className="dark:text-dark-subtle text-light-subtle font-semibold"
        >
          Title
        </label>
        <input
          id="title"
          placeholder="Titanic"
          type="text"
          className="w-full bg-transparent outline-none border-b-2 dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary transition"
        />
      </div>
      <div className="w-[30%] h-5 "></div>
    </form>
  );
};

export default MovieForm;
