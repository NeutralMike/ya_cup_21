import requests

var_names = []

for i in range(4):
    var_names.append(input())


answer = {}

first_pair = []
second_pair = []
third_pair = []

first_resp = requests.request(
    url="http://127.0.0.1:7777",
    method='MEW',
    headers={'X-Cat-Variable': ', '.join(var_names[:2])},
)
headers_names = first_resp.headers.keys()
for header_name in headers_names:
    if header_name.lower() == 'x-cat-value':
        first_pair = first_resp.headers.get(header_name).split(', ')

second_resp = requests.request(
    url="http://127.0.0.1:7777",
    method='MEW',
    headers={'X-Cat-Variable': ', '.join(var_names[1:3])},
)
headers_names = second_resp.headers.keys()
for header_name in headers_names:
    if header_name.lower() == 'x-cat-value':
        second_pair = second_resp.headers.get(header_name).split(', ')

third_resp = requests.request(
    url="http://127.0.0.1:7777",
    method='MEW',
    headers={'X-Cat-Variable': ', '.join(var_names[2:4])},
)
headers_names = third_resp.headers.keys()
for header_name in headers_names:
    if header_name.lower() == 'x-cat-value':
        third_pair = third_resp.headers.get(header_name).split(', ')

if first_pair[1] != second_pair[0]:
    first_pair = first_pair[::-1]
if first_pair[1] != second_pair[0]:
    second_pair = second_pair[::-1]
if first_pair[1] != second_pair[0]:
    first_pair = first_pair[::-1]
if third_pair[0] != second_pair[1]:
    third_pair = third_pair[::-1]

answer[var_names[0]] = first_pair[0]
answer[var_names[1]] = first_pair[1]
answer[var_names[2]] = third_pair[0]
answer[var_names[3]] = third_pair[1]

for name in var_names:
    print(answer.get(name))



