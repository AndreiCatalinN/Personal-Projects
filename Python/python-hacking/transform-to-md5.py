# created this file to convert passwords into md5 hashes
# can convert into others as long as lines 8, 12 and 19 are changed
# Author: andrei negura
# date: 16/05/2020

from hashlib import md5

if __name__ == '__main__':
    word_list = "10-million-password-list-top-1000000.txt"
    md5_file = "hashed_md5.txt"
    # open files
    try:
        pass_file = open(word_list, 'r')
        new_pass_file = open(md5_file, 'w')
    except IOError:
        print('File not found')
        quit()
    print("Processing")

    for word in pass_file:
        word = word.encode('utf-8').strip()
        word = md5(word).hexdigest() + '\n'
        new_pass_file.writelines(word)

    print("finished")
    pass_file.close()
    new_pass_file.close()