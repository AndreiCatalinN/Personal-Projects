# Requirements:
# pip install pytube3 beautifulsoup4 requests
# does not work for any link

from pytube import YouTube
import bs4
import requests


def youtube_scrap():
    playlist = []
    # url=input("Enter the Youtube Playlist URL : ") #Takes the Playlist Link
    url = r"https://www.youtube.com/playlist?list=PLGzz7pyosmlJfx9ivigemSouoZR9uLT2-"
    data = requests.get(url)
    soup = bs4.BeautifulSoup(data.text, 'html.parser')

    # get playlist
    for links in soup.find_all('a'):
        link = links.get('href')
        if link[0:6] == "/watch" and link[0] != "#":
            link = "https://www.youtube.com" + link
            link = str(link)
            playlist.append(link)
    # clean playlist
    print("html has been parsed")
    del playlist[0:2]
    playlist = set(playlist)
    print(playlist)
    print("and the list cleaned")

    # download
    vquality = input("Enter the video quality (1080,720,480,360,240,144):")
    vquality = vquality + "p"

    for link in playlist:
        yt = YouTube(link)
        videos = yt.streams.filter(mime_type="video/mp4", res=vquality)
        video = videos[0]
        video.download("Downloads")
        print(yt.title + " - has been downloaded !!!")


if __name__ == '__main__':
    youtube_scrap()
