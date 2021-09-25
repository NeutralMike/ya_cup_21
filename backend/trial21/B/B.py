import json


with open('input.txt', 'r') as input_file:
    n, m = map(int, input_file.readline().split())

    offers = []
    i = 0
    while i < n and len(offers) < m:
        i += 1
        offers.extend(json.loads(input_file.readline())['offers'])
    offers = offers[:m]

with open('output.txt', 'w') as output_file:
    output_file.write(json.dumps({'offers': offers}))
