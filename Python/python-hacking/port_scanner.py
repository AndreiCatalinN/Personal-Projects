from socket import \
    socket, \
    AF_INET, \
    SOCK_STREAM, \
    gaierror, \
    error
from time import time
import sys

start_time = time()


def pscan(target, port):
    try:
        con = s.connect((target, port))
        return True
    except KeyboardInterrupt:
        print("You pressed Ctrl+C")
    except gaierror:
        print('IP could not be resolved. Exiting')
    except error:
        print("Couldn't connect to server")
    except:
        return False


if __name__ == '__main__':

    target_IP = input('enter target IP: ')
    print("starting scan on", target_IP)
    s = socket(AF_INET, SOCK_STREAM)

    for port in range(1, 65000):
        if pscan(target_IP, port):
            print('port ' + port + ' is open')
    print('time taken', time() - start_time)
    s.close()
