import { useState } from "react";
import Loader from "./components/Loader";
import SearchBar from "./components/SearchBar";
import VideoResult from "./components/VideoResult";
import DownloadIcon from "./assets/icons/download.svg";

function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  return (
    <div className="h-screen w-screen pb-64 md:pb-64 lg:pb-0 flex flex-col gap-8 justify-center items-center bg-customBlack">
      <div className="flex justify-center items-center gap-4">
        <img src={DownloadIcon} className="h-10 w-10" alt="download icon" />
        <h1 className="text-4xl font-bold text-customWhite">YT Downloader</h1>
      </div>
      <div className="w-full flex flex-col justify-center gap-8 items-center">
        {/* Input and Search Button */}
        <SearchBar setLoading={setLoading} setResult={setResult} />

        {/* Loader */}
        {loading && <Loader />}

        {/* Video Result */}
        {result && <VideoResult video={result} />}
      </div>
    </div>
  );
}

export default App;
