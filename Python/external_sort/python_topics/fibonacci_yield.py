def fib(limit):
    a, b = 0, 1

    while a < limit:
        yield a
        a, b = b, a + b


if __name__ == '__main__':
    x = fib(10)

    for num in x:
        print(num)
