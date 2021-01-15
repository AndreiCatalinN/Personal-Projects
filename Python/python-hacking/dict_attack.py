# Author: Andrei Negura
# Date: 16/05/2020

from hashlib import md5


def dictionary_attack():
    flag = 0
    # get file
    pass_hash = md5(input('password: ').strip().encode('utf-8')).hexdigest()
    # word_list = input('filename:')
    word_list = "hashed_md5.txt"
    # open file
    try:
        pass_file = open(word_list, 'r')
    except IOError:
        print('File not found')
        quit()

    for hash in pass_file:
        # print(word)
        # print(digest)
        # print(pass_hash)
        if hash.strip() == pass_hash:
            print('password found: ' + hash)
            flag = 1
            break

    if flag == 0:
        print('password not in list')
    pass_file.close()


if __name__ == '__main__':
    dictionary_attack()
