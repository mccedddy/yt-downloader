from pytube import YouTube
import yt_dlp

def download_video_pytube(url):
    try:
        yt = YouTube(url)

        # Get highest resolution
        video = yt.streams.get_highest_resolution()

        # Download the video to the specified path
        print(f"Downloading with pytube: {yt.title}")
        video.download("/Downloads")
        print(f"Downloaded with pytube: {yt.title}")
        
    except Exception as e:
        print(f"pytube Error: {e}")
        return False
    
    return True

def download_video_ytdlp(url):
    try:
        ydl_opts = {
            'format': 'best',
            'outtmpl': 'downloads/%(title)s.%(ext)s'
        }
        
        # Download the video using yt-dlp
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])
            print(f"Downloaded with yt-dlp: {url}")
        
    except Exception as e:
        print(f"yt-dlp Error: {e}")

def main():
    print("\n========================")
    print("|| YouTube Downloader ||")
    print("========================")
    
    url = ""

    while url.lower() not in ["q", "exit"]:
        url = input("\nEnter YouTube video URL (or 'q' to quit): ")

        if url.lower() not in ["q", "exit"]:
            # First try with pytube
            print("Attempting to download with pytube...")
            success = download_video_pytube(url)
            
            # Try with yt-dlp
            if not success:
                print("Attempting to download with yt-dlp...")
                download_video_ytdlp(url)
            
    print("Exiting...\n")

if __name__ == "__main__":
    main()