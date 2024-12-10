package main

import (
	"bufio"
	"fmt"
	"os"
	"path/filepath"
)

func main() {
	fileName := "day_3_input.txt"

	dir := filepath.Dir("./input/")
	inputFile := filepath.Join(dir, fileName)

	fmt.Println(inputFile)

	file, err := os.Open(inputFile)

	if err != nil {
		panic(err)
	}

	defer file.Close()

	scanner := bufio.NewScanner(file)

	var input string
	for scanner.Scan() {
		input += scanner.Text() + "\n"
	}

	if err := scanner.Err(); err != nil {
		panic(err)
	}

	day3_1(input)
	day3_2(input)
}
