import tkinter as tk
from tkinter import messagebox
import yt_dlp
import os

# Create main window
root = tk.Tk()
root.title("YouTube Downloader")
root.geometry("400x300")

# Video data
yt_url = ""
video_info = {}

# Define download folder path
DOWNLOAD_PATH = os.path.join(os.getcwd(), "downloads")

# Ensure the downloads folder exists
if not os.path.exists(DOWNLOAD_PATH):
    os.makedirs(DOWNLOAD_PATH)

# Format Duration
def format_duration(duration):
    hours, remainder = divmod(duration, 3600)
    minutes, seconds = divmod(remainder, 60)
    if hours > 0:
        return f"{hours}:{minutes:02}:{seconds:02}"
    return f"{minutes}:{seconds:02}"

# Fetch and display the video details
def fetch_video():
    global yt_url, video_info
    yt_url = url_entry.get()

    try:
        ydl_opts = {
            'quiet': True,
            'skip_download': True,
        }

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            video_info = ydl.extract_info(yt_url, download=False)
        
        # Display video details
        video_title_label.config(text=video_info['title'])
        video_duration_label.config(text=format_duration(video_info['duration']))

        # Show the download button
        download_button.pack(pady=10)  

    except Exception as e:
        messagebox.showerror("Error", f"Failed to fetch video: {e}")
        video_info = {}

# Download video in MP4 format
def download_video():
    global yt_url, video_info
    if not yt_url or not video_info:
        messagebox.showwarning("Warning", "No video selected to download!")
        return

    try:
        # Set options to download in MP4 format without merging
        ydl_opts = {
            'format': 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/mp4',
            'outtmpl': os.path.join(DOWNLOAD_PATH, '%(title)s.%(ext)s'),
            'noplaylist': True,
        }

        ydl_opts['format'] = 'best[ext=mp4]'

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([yt_url])
            messagebox.showinfo("Success", f"Video downloaded successfully to {DOWNLOAD_PATH}!")

    except Exception as e:
        messagebox.showerror("Error", f"Failed to download video: {e}")

def reset_video():
    video_title_label.config(text="")
    video_duration_label.config(text="")
    download_button.pack_forget()

# URL textbox
tk.Label(root, text="YouTube URL:").pack(pady=5)
url_entry = tk.Entry(root, width=50)
url_entry.pack(pady=5)
url_entry.bind("<KeyRelease>", lambda e: reset_video())

# Submit button
submit_button = tk.Button(root, text="Submit", command=fetch_video)
submit_button.pack(pady=10)

# Video details
video_title_label = tk.Label(root, text="")
video_title_label.pack(pady=3)

video_duration_label = tk.Label(root, text="")
video_duration_label.pack(pady=3)

# Download button (initially hidden)
download_button = tk.Button(root, text="Download", command=download_video)

# Tkinter loop
root.mainloop()
