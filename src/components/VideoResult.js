import DownloadIcon from "../assets/icons/download.svg";
import YoutubeLogo from "../assets/images/youtube.jpg";

function VideoResult() {
  return (
    <div className="flex flex-col items-center mt-8 gap-2">
      <img
        src={YoutubeLogo}
        alt="Video Thumbnail"
        className="w-64 h-32 object-cover rounded-lg"
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
  );
}

export default VideoResult;
