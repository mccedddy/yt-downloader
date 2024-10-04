import DownloadIcon from "../assets/icons/download.svg";
import YoutubeLogo from "../assets/images/youtube.jpg";

function VideoResult({ video }) {
  const handleDownload = async () => {
    const url = video.download_url;
    const response = await fetch(url);
    if (response.status === 200) {
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = `${video.title}.mp4`;
      a.click();
    } else {
      console.error("Error occurred while downloading the video");
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <img
        src={video.thumbnails || YoutubeLogo}
        alt="Video Thumbnail"
        className="w-80 h-45 object-cover rounded-lg"
      />

      <div className="w-80 flex justify-between">
        <h1 className="text-sm font-bold text-customWhite">{video.title}</h1>
        <h1 className="text-sm text-customGray-lighter">{video.duration}</h1>
      </div>

      <button
        onClick={handleDownload}
        className="h-8 w-32 mt-4 pl-3 pr-4 flex justify-center items-center gap-2 rounded-lg bg-customRed text-customWhite"
      >
        <img src={DownloadIcon} className="h-4 w-4" alt="download icon" />
        Download
      </button>
    </div>
  );
}

export default VideoResult;
