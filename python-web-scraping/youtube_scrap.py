# Requirements:
# pip install pytube3 beautifulsoup4 requests
# pip install --upgrade git+https://gitlab.com/obuilds/public/pytube@ob-v1
# This script downloads youtube playlists

from pytube import YouTube
import bs4
import requests


def get_page(url):
    data = requests.get(url)
    return bs4.BeautifulSoup(data.text, 'html.parser')


def youtube_scrap(url, download_type="", res=""):
    playlist = []
    soup = get_page(url)

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

    print("Downloading...")
    for link in playlist:
        yt = YouTube(link)
        videos = yt.streams.filter(mime_type=download_type, res=res)
        video = videos[0]
        video.download("Downloads")
        print(yt.title + " - has been downloaded !!!")


if __name__ == '__main__':
    # works
    # youtube_scrap(
    #     r"https://www.youtube.com/playlist?list=PLGzz7pyosmlJfx9ivigemSouoZR9uLT2-",
    #     "video/mp4",
    #     "1080p"
    # )

    # works
    youtube_scrap(
        r"https://www.youtube.com/watch?v=egTDJbKY-fk&list=PLBzBwYhHpqLJgtieIsSd_uncvdwqnr5bp&index=9"
    )
