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

  const formatVideoLength = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return hrs > 0
      ? `${hrs}:${mins.toString().padStart(2, "0")}:${secs
          .toString()
          .padStart(2, "0")}`
      : `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <img
        src={video.thumbnails[4].url || YoutubeLogo}
        alt="Video Thumbnail"
        className="w-80 h-45 object-cover rounded-lg"
      />

      <div className="w-80 flex justify-between">
        <h1 className="text-sm font-bold text-customWhite">{video.title}</h1>
        <h1 className="text-sm text-customGray-lighter">
          {formatVideoLength(video.lengthSeconds)}
        </h1>
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
