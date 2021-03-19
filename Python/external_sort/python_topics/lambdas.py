def cube(num):
    return num**3


def power(n):
    return lambda a: a**n


if __name__ == '__main__':
    g = lambda x: x ** 3
    print(g(7))
    print(cube(8))

    # 8**2
    base = power(2)
    print(base(8))
    # 5**5
    base = power(5)
    print(base(5))
