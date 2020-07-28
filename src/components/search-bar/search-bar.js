import React, { useState } from "react";

const SearchBar = ({ loading, onSearch }) => {
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className="search-bar">
      <div className="flex flex-col items-center my-8">
        <input
          className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-3/6 appearance-none leading-normal m-4"
          type="text"
          placeholder="search for organizations"
          onChange={(e) => setSearchValue(e.target.value)}
        />

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          disabled={!searchValue || loading}
          onClick={() => onSearch(searchValue)}
        >
          {loading ? "Loading ..." : "Search"}
        </button>
      </div>
    </div>
  );
};
export default SearchBar;
