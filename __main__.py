import tkinter as tk
from tkinter import messagebox
import yt_dlp
import os
import sys
from PIL import Image, ImageTk

# Create main window
root = tk.Tk()
root.title("YouTube Downloader")
root.geometry("550x380")
root.resizable(False, False) 
root.configure(bg="#121212")

# Get the absolute path of the icon file relative to the executable
if getattr(sys, 'frozen', False):
    # If the application is run as an executable
    icon_path = os.path.join(sys._MEIPASS, 'icon.ico')
    header_image_path = os.path.join(sys._MEIPASS, 'icon.png')
else:
    # If the application is run in a regular Python environment
    icon_path = os.path.join(os.getcwd(), 'icon.ico')
    header_image_path = os.path.join(os.getcwd(), 'icon.png')


# Set the window icon
root.iconbitmap(icon_path)

# Video data
yt_url = ""
video_info = {}

# Define download folder path
DOWNLOAD_PATH = os.path.join(os.getcwd(), "downloads")
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

        video_title_label.config(text=video_info['title'])
        video_duration_label.config(text=format_duration(video_info['duration']))

        output_frame.pack(pady=10)

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
        ydl_opts = {
            'format': 'best[ext=mp4]',
            'outtmpl': os.path.join(DOWNLOAD_PATH, '%(title)s.%(ext)s'),
            'noplaylist': True,
        }

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([yt_url])
            messagebox.showinfo("Success", f"Video downloaded successfully to {DOWNLOAD_PATH}!")

    except Exception as e:
        messagebox.showerror("Error", f"Failed to download video: {e}")

def reset_video():
    video_title_label.config(text="")
    video_duration_label.config(text="")
    download_button.pack_forget()

def open_folder():
    os.startfile(DOWNLOAD_PATH)

# Frames
header_frame = tk.Frame(root, bg="#121212", bd=0)
header_frame.pack(pady=(40, 20))

input_frame = tk.Frame(root, bg="#121212", bd=0)
input_frame.pack(pady=10)

output_frame = tk.Frame(root, bg="#272727", bd=0)

folder_frame = tk.Frame(root, bg="#272727", bd=0)

# Header
if os.path.exists(header_image_path):
    header_image = Image.open(header_image_path)
    header_image = header_image.resize((40, 40), Image.LANCZOS)
    header_image = ImageTk.PhotoImage(header_image)

    image_label = tk.Label(header_frame, image=header_image, bg="#121212")
    image_label.pack(side=tk.LEFT, padx=(0, 10))
else:
    print(f"Image file not found at {header_image_path}")

header_label = tk.Label(header_frame, text="YouTube Downloader", bg="#121212", fg="white", font=('Helvetica', 20))
header_label.pack(side=tk.RIGHT)

# URL textbox with padding
url_entry = tk.Entry(input_frame, width=40, bg="#272727", fg="white", bd=5, insertbackground='white', relief="flat", font=('Helvetica', 12))
url_entry.pack(side=tk.LEFT, padx=(0, 10))

# Search button
search_button = tk.Button(input_frame, text="Search", bg="#272727", fg="white", command=fetch_video, bd=3, relief="flat", font=('Helvetica', 10))
search_button.pack(side=tk.LEFT)

# Video details
video_title_label = tk.Label(output_frame, text="", bg="#272727", fg="white", font=('Helvetica', 12))
video_title_label.pack(pady=(10, 3), padx=10)

video_duration_label = tk.Label(output_frame, text="", bg="#272727", fg="white", font=('Helvetica', 12))
video_duration_label.pack(pady=3)

# Download button (initially hidden)
download_button = tk.Button(output_frame, width=12, text="Download", bg="#FF0033", fg="white",  relief="flat", command=download_video, font=('Helvetica', 12))
download_button.pack(pady=(10,20))

# Folder button
folder_button = tk.Button(root, text="Open downloads folder", bg="#121212", fg="gray", command=open_folder, bd=3, relief="flat", font=('Helvetica', 10))
folder_button.pack(pady=0)

# Tkinter loop
root.mainloop()
