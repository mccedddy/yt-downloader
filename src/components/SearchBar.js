import { useState } from "react";
import SearchIcon from "../assets/icons/search.svg";

function SearchBar({ setLoading, setResult }) {
  const [link, setLink] = useState("");

  return (
    <div className="w-10/12 md:w-7/12 lg:w-5/12 flex justify-center">
      <input
        type="url"
        className="h-12 w-full px-3 outline-none bg-customBlack-light placeholder-customGray-lighter text-customWhite border border-customGray-light rounded-l-full focus:border-customBlue"
        placeholder="Enter YouTube Link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <button className="w-16 pr-2 pl-1 flex justify-center items-center bg-customGray border-t border-r border-b border-customGray-light rounded-r-full">
        <img src={SearchIcon} className="h-6 w-6" alt="search icon" />
      </button>
    </div>
  );
}

export default SearchBar;
