# coroutine example
def print_name(prefix):
    print("Searching prefix: ", prefix)
    try:
        while True:
            name = (yield)
            if prefix in name:
                print(name)
    except GeneratorExit:
        print("Closing in")


# coroutine chaining
def producer(sentence, next_coroutine):
    """
    producer coroutine.
    The producer splits the strings and feeds them into pattern_filter"""
    tokens = sentence.split(" ")
    for token in tokens:
        next_coroutine.send(token)
    next_coroutine.close()


def pattern_filter(pattern="ing", next_coroutine=None):
    """
    middle coroutine
    Search for pattern in received tokens and if it matches, send it for printing
    """

    print("Searching for: ", pattern)
    print("''''''")
    try:
        while True:
            token = (yield)
            if pattern in token:
                next_coroutine.send(token)
    except GeneratorExit:
        print("''''''")
        print("Finished filtering")


def print_token():
    """Used for printing. Sink coroutine"""
    try:
        while True:
            token = (yield)
            print(token)
    except GeneratorExit:
        print("Done printing")


if __name__ == '__main__':
    # one coroutine
    # coroutine = print_name("Tia")
    # coroutine.__next__()
    # coroutine.send("Tia Maria")
    # coroutine.send("Andrei")
    # coroutine.close()

    # coroutine chaining
    print_t = print_token()
    print_t.__next__()
    pattern_f = pattern_filter(next_coroutine=print_t)
    pattern_f.__next__()
    sentence = "Bob is running behind a fast moving car"
    producer(sentence, pattern_f)
