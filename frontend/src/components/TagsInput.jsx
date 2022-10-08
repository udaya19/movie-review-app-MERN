import React, { useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const TagsInput = () => {
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const tagsInput = useRef();
  const handleOnChange = ({ target }) => {
    const { value } = target;
    if (value !== ",") setTag(value);
  };
  const handleKeyDown = ({ key }) => {
    if (key === "," || key === "Enter") {
      if (!tag) return;
      if (tags.includes(tag)) return setTag("");
      setTags([...tags, tag]);
      setTag("");
    }
    if (key === "Backspace" && !tag && tags.length) {
      const newTags = tags.filter((_, index) => index !== tags.length - 1);
      setTags([...newTags]);
    }
  };
  const removeTag = (tagToRemove) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags([...newTags]);
  };
  const handleOnFocus = () => {
    tagsInput.current.classList.remove(
      "dark:border-dark-subtle",
      "border-light-subtle"
    );
    tagsInput.current.classList.add("dark:border-white", "border-primary");
  };
  const handleOnBlur = () => {
    tagsInput.current.classList.add(
      "dark:border-dark-subtle",
      "border-light-subtle"
    );
    tagsInput.current.classList.remove("dark:border-white", "border-primary");
  };
  return (
    <div>
      <div
        ref={tagsInput}
        onKeyDown={handleKeyDown}
        className="border-2 bg-transparent transition dark:border-dark-subtle dark:text-white flex items-center space-x-2 border-light-subtle px-2 h-10 rounded w-full overflow-x-auto custom-scroll-bar"
      >
        {tags.map((t) => (
          <Tag
            onClick={() => {
              removeTag(t);
            }}
            key={t}
          >
            {t}
          </Tag>
        ))}
        <input
          type="text"
          className="h-full flex-grow bg-transparent outline-none dark:text-white"
          value={tag}
          onChange={handleOnChange}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          placeholder="tag one,tag two"
        />
      </div>
    </div>
  );
};

const Tag = ({ children, onClick }) => {
  return (
    <span className="dark:bg-white flex items-center text-sm px-1 bg-primary dark:text-primary text-white whitespace-nowrap">
      {children}
      <button type="button" onClick={onClick}>
        <AiOutlineClose size={12} />
      </button>
    </span>
  );
};

export default TagsInput;
