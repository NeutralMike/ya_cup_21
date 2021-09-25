import json
import requests


with open('input.txt', 'r') as input_file:
    url = input_file.readline().strip()
    port = int(input_file.readline())
    a = int(input_file.readline())
    b = int(input_file.readline())

response = requests.get(f'{url}:{port}', params={'a': a, 'b': b})
res = response.json()
res.sort(reverse=True)
res = filter(lambda x: x > 0, res)

with open('output.txt', 'w') as output_file:
    output_file.write('\n'.join(map(str, res)))
