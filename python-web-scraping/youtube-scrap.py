# Requirements:
# pip install pytube3 beautifulsoup4 requests
# does not work for any link

from pytube import YouTube
import bs4
import requests

def get_page(url):
    data = requests.get(url)
    return bs4.BeautifulSoup(data.text, 'html.parser')

def youtube_scrap(url):
    playlist = []
    soup = get_page(r"https://www.youtube.com/playlist?list=PLGzz7pyosmlJfx9ivigemSouoZR9uLT2-")

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


def youtube_scrap2():
    playlist = []
    soup = get_page(r"https://www.youtube.com/watch?v=egTDJbKY-fk&list=PLBzBwYhHpqLJgtieIsSd_uncvdwqnr5bp&index=9")

    # get playlist
    for links in soup.find_all('a', {id: "wc-endpoint"}):
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
    vquality = "720" # input("Enter the video quality (1080,720,480,360,240,144):")
    vquality = vquality + "p"

    for link in playlist:
        yt = YouTube(link)
        videos = yt.streams.filter(mime_type="audio/mp3")
        video = videos[0]
        video.download("Downloads")
        print(yt.title + " - has been downloaded !!!")


if __name__ == '__main__':

