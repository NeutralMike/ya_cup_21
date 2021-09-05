
with open('input.txt', 'r') as input_file:
    J = set(input_file.readline().strip())
    S = list(input_file.readline().strip())

answer = 0
for j in J & set(S):
    answer += S.count(j)

with open('output.txt', 'w') as output_file:
    output_file.write(str(answer))

