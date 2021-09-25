with open('input.txt', 'r') as input_file:
    N, X, K = map(int, input_file.readline().split())
    T = set(map(int, set(input_file.readline().split())))


def find_start(start, end):
    if (end - start) == 1:
        if T[0] + X <= T[start]:
            return start
        else:
            return end
    mid = start + (end - start) // 2
    if T[0] + X == T[mid]:
        return mid
    if T[0] + X < T[mid]:
        return find_start(start, mid)
    if T[0] + X > T[mid]:
        return find_start(mid, end)


answer = 0
if K > 0:
    T_copy = T.copy()
    max_t = max(T)
    for t in T_copy:
        limit = t + X * K
        if max_t < limit:
            limit = max_t
        T -= set(range(t + X, limit+1, X))
    T = sorted(T)[:K]
    n = len(T)
    iter = 0

    while iter < K-1:
        if n > 2 and T[0] + X < T[1]:
            start = find_start(0, n)
        else:
            start = 1
        for i in range(start):
            T[i] += X
            iter += 1
            if iter == K-1:
                break
        T = sorted(T)

    answer = T[0]

with open('output.txt', 'w') as output_file:
    output_file.write(str(answer))
