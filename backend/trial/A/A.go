package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	input_file, _ := os.Open("A/input.txt")
	reader := bufio.NewReader(input_file)

	jewels_raw, _ := reader.ReadString('\n')
	jewels := strings.Trim(jewels_raw, "\n")
	stones_raw, _ := reader.ReadString('\n')
	stones := strings.Trim(stones_raw, "\n")

	res := 0
	for i := 0; i < len(jewels); i++ {
		for j := 0; j < len(stones); j++ {
			if jewels[i] == stones[j] {
				res ++
			}
		}
	}

	output_file, _ := os.Open("A/output.txt")
	//output_file.Sync()
	//writer := bufio.NewWriter(output_file)
	output_file.WriteString(fmt.Sprintf("%d", res))
	output_file.WriteString("wtf")
}
