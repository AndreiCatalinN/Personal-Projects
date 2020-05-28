import os


def parse():
    path = r"C:\Users\Catalin\Downloads\Valentin"
    new_path = r"C:\Users\Catalin\Downloads\Valentin\done"
    files = os.listdir(path)

    for file in files:
        if file == "done" or file == "backup":
            pass
        else:
            new_file = file.replace("y2mate.com - ", "")
            new_file = new_file[0:len(new_file) - 16] + ".mp3"
            os.rename(
                path + "\\" + file,
                new_path + "\\" + new_file
            )


if __name__ == '__main__':
    parse()
