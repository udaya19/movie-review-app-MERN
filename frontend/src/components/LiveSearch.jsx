import React, { useEffect, useRef, useState } from "react";
import { commonInputClasses } from "../utils/theme";

export const results = [
  {
    id: "1",
    avatar:
      "https://images.unsplash.com/photo-1643713303351-01f540054fd7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "John Doe",
  },
  {
    id: "2",
    avatar:
      "https://images.unsplash.com/photo-1643883135036-98ec2d9e50a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Chandri Anggara",
  },
  {
    id: "3",
    avatar:
      "https://images.unsplash.com/photo-1578342976795-062a1b744f37?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Amin RK",
  },
  {
    id: "4",
    avatar:
      "https://images.unsplash.com/photo-1564227901-6b1d20bebe9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Edward Howell",
  },
  {
    id: "5",
    avatar:
      "https://images.unsplash.com/photo-1578342976795-062a1b744f37?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Amin RK",
  },
  {
    id: "6",
    avatar:
      "https://images.unsplash.com/photo-1564227901-6b1d20bebe9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Edward Howell",
  },
];

const LiveSearch = () => {
  let nextCount;
  const [displaySearch, setDisplaySearch] = useState(false);
  const [focussedIndex, setFocussedIndex] = useState(-1);
  const handleOnFocus = () => {
    if (results.length) setDisplaySearch(true);
  };
  const handleOnBlur = () => {
    setDisplaySearch(false);
    setFocussedIndex(-1);
  };
  const handleKeyDown = ({ key }) => {
    const keys = ["ArrowDown", "ArrowUp", "Enter", "Escape"];
    if (!keys.includes(key)) return;
    if (key === "ArrowDown") {
      nextCount = (focussedIndex + 1) % results.length;
    }
    if (key === "ArrowUp") {
      nextCount = (focussedIndex + results.length - 1) % results.length;
    }
    setFocussedIndex(nextCount);
  };
  return (
    <div className="relative">
      <input
        type="text"
        className={`border-2 rounded p-1 text-lg ${commonInputClasses}`}
        placeholder="Search Profile"
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onKeyDown={handleKeyDown}
      />
      <SearchResults
        focussedIndex={focussedIndex}
        results={results}
        visible={displaySearch}
      />
    </div>
  );
};

const SearchResults = ({ visible, results = [], focussedIndex }) => {
  const resultContainer = useRef();
  useEffect(() => {
    resultContainer.current?.scrollIntoView({
      behaviour: "smooth",
      block: "center",
    });
  }, [focussedIndex]);
  if (!visible) return null;
  return (
    <div className="absolute right-0 left-0 top-10 bg-white dark:bg-secondary shadow-md p-2 max-h-64 space-y-2 mt-1 overflow-auto">
      {results.map(({ id, name, avatar }, index) => {
        return (
          <div
            ref={index === focussedIndex ? resultContainer : null}
            key={id}
            className={
              (index === focussedIndex
                ? "dark:bg-dark-subtle bg-light-subtle"
                : "") +
              "cursor-pointer flex space-x-2 rounded overflow-hidden dark:hover:bg-dark-subtle hover:bg-light-subtle transition"
            }
          >
            <img src={avatar} alt={name} className="w-16 h-16" />
            <p className="dark:text-white font-semibold">{name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default LiveSearch;
