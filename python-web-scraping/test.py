'''
12:05:39AM
12:40:22AM
12:45:54PM
12:00:00AM
'''

if __name__ == '__main__':
    s = "12:05:39AM"

    if s.find("PM") != -1:
        s = str(int(s[0:2]) + 12) + s[2:len(s) - 2]
    else:
        if s[0:2].find("12") != -1:
            s = "00"+s[2:]
        s = s[:len(s) - 2]
    print(s)

