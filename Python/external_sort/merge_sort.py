# inspired by https://www.geeksforgeeks.org/merge-sort/
def merge_sort(array):
    if len(array) > 1:
        # find the middle of the array
        mid = len(array) // 2
        # split in 2 arrays
        left_array = array[:mid]
        right_array = array[mid:]

        # merge sides
        merge_sort(left_array)
        merge_sort(right_array)

        i = j = k = 0

        while i < len(left_array) and j < len(right_array):
            if left_array[i] < right_array[j]:
                array[k] = left_array[i]
                i += 1
            else:
                array[k] = right_array[j]
                j += 1
            k += 1

        # check if elements are left
        while i < len(left_array):
            array[k] = left_array[i]
            i += 1
            k += 1

        while j < len(right_array):
            array[k] = right_array[j]
            j += 1
            k += 1


if __name__ == '__main__':
    array = [12, 12, 5, 3, 6, 123, 2, 1, 8, 10, 13, 15]

    print("Unsorted: ", array)
    merge_sort(array)
    print("Sorted: ", array)

    pass
