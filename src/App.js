import SearchIcon from "./assets/icons/search.svg";
import DownloadIcon from "./assets/icons/download.svg";
import YoutubeLogo from "./assets/images/youtube.jpg";

function App() {
  return (
    <div className="h-screen w-screen flex flex-col gap-8 justify-center items-center bg-customBlack">
      <h1 className="text-4xl font-bold text-customWhite">YT Downloader</h1>
      <div className="flex flex-col gap-8 items-center">
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

        {/* Loader */}
        <div className="flex flex-col justify-center items-center gap-8">
          <div className="spinner"></div>
          <h1 className="text-customWhite">Proecssing download link...</h1>
        </div>

        {/* Video */}
        <div className="flex flex-col items-center gap-2">
          <img
            src={YoutubeLogo}
            alt="Video Thumbnail"
            className="w-96 h-54 object-cover rounded-lg"
          />

          <div className="flex justify-between w-full">
            <h1 className="text-sm font-bold text-customWhite">
              Title Title Title Title
            </h1>
            <h1 className="text-sm text-customGray-lighter">3:45</h1>
          </div>
          <button className="h-8 w-32 mt-2 pl-3 pr-4 flex justify-center items-center gap-2 rounded-lg bg-customRed text-customWhite">
            <img src={DownloadIcon} className="h-4 w-4" alt="download icon" />
            Download
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
