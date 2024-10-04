import { useState } from "react";
import SearchIcon from "../assets/icons/search.svg";

function SearchBar({ setLoading, setResult }) {
  const [link, setLink] = useState("");

  const fetchVideoDetails = async (videoId) => {
    const url = `https://youtube-media-downloader.p.rapidapi.com/v2/video/details?videoId=${videoId}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.REACT_APP_API_KEY,
        "x-rapidapi-host": "youtube-media-downloader.p.rapidapi.com",
      },
    };

    try {
      setLoading(true);
      setResult(null);
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);
      setResult(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const videoId = extractVideoIdFromURL(link);
    if (videoId) {
      fetchVideoDetails(videoId);
    } else {
      alert("Please enter a valid YouTube link");
    }
  };

  const extractVideoIdFromURL = (url) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)|(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]+)/;
    const match = url.match(regex);
    return match ? match[1] || match[2] : null;
  };

  return (
    <div className="w-10/12 md:w-7/12 lg:w-5/12 flex justify-center">
      <input
        type="url"
        className="h-12 w-full px-3 outline-none bg-customBlack-light placeholder-customGray-lighter text-customWhite border border-customGray-light rounded-l-full focus:border-customBlue"
        placeholder="Enter YouTube Link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="w-16 pr-2 pl-1 flex justify-center items-center bg-customGray border-t border-r border-b border-customGray-light rounded-r-full"
      >
        <img src={SearchIcon} className="h-6 w-6" alt="search icon" />
      </button>
    </div>
  );
}

export default SearchBar;
