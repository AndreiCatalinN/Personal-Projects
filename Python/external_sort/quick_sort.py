
def partition(arr, low, high):
    """
    Places the pivot in correct position in sorted array and
    all smaller elements to the left of pivot
    all bigger elements to the right of pivot
    :param arr: array to be sorted
    :param low:
    :param high:
    :return:
    """
    i = low - 1
    pivot = arr[high]

    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]

    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1


def quick_sort(arr, low, high):

    if len(arr) == 1:
        return arr
    if low < high:

        pi = partition(arr, low, high)
        # sort elements before and after pivot
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)


if __name__ == '__main__':
    arr = [11, 9, 7, 5, 3, 2, 1]
    n = len(arr)

    quick_sort(arr, 0, n - 1)
    print("Sorted: ", arr)
