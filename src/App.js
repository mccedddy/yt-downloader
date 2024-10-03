import SearchIcon from "./assets/icons/search.svg";
import YoutubeLogo from "./assets/images/youtube.jpg";

function App() {
  return (
    <div className="h-screen w-screen flex flex-col gap-4 justify-center items-center bg-customBlack">
      <h1 className="text-2xl font-bold text-customWhite">YT Downloader</h1>
      <div className="flex flex-col gap-4 items-center">
        {/* Input and Search Button */}
        <div className="flex">
          <input
            type="url"
            className="h-8 w-80 px-3 outline-none bg-customBlack-light placeholder-customGray-lighter text-customWhite border border-customGray-light rounded-l-full focus:border-customBlue"
            placeholder="Link"
          />
          <button className="w-12 pr-2 pl-1 flex justify-center items-center bg-customGray border-t border-r border-b border-customGray-light rounded-r-full">
            <img src={SearchIcon} className="h-6 w-6" alt="search icon" />
          </button>
        </div>

        {/* Video Information */}
        <div className="flex flex-col gap-2">
          {/* Thumbnail */}
          <img
            src={YoutubeLogo}
            alt="Video Thumbnail"
            className="w-96 h-54 object-cover rounded-lg"
          />

          {/* Title and Duration */}
          <div className="flex justify-between w-full">
            <h1 className="font-bold text-customWhite">
              Title Title Title Title
            </h1>
            <h1 className="text-customGray">3:45</h1>
          </div>
        </div>

        <button className="h-8 px-4 rounded-lg bg-customRed text-customWhite">
          Download
        </button>
      </div>
    </div>
  );
}

export default App;
