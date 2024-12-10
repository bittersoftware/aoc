package main

import (
	"fmt"
	"sort"
	"strconv"
	"strings"
)

func day1_1(input string) {
	output := 0

	var letfCol []int
	var rightCol []int

	lines := strings.Split(strings.TrimSpace(input), "\n")

	for _, line := range lines {
		columns := strings.Fields(line)

		firstNum, _ := strconv.Atoi(columns[0])
		secondNum, _ := strconv.Atoi(columns[1])

		letfCol = append(letfCol, firstNum)
		rightCol = append(rightCol, secondNum)
	}

	sort.Ints(letfCol)
	sort.Ints(rightCol)

	for i := 0; i < len(letfCol); i++ {
		difference := letfCol[i] - rightCol[i]

		if difference < 1 {
			difference = difference * -1
		}

		output += difference
	}

	fmt.Println("Output of Day 1 Part 1:", output)
}

func day1_2(input string) {
	output := 0

	var letfCol []int
	var rightCol []int

	lines := strings.Split(strings.TrimSpace(input), "\n")

	for _, line := range lines {
		columns := strings.Fields(line)

		firstNum, _ := strconv.Atoi(columns[0])
		secondNum, _ := strconv.Atoi(columns[1])

		letfCol = append(letfCol, firstNum)
		rightCol = append(rightCol, secondNum)
	}

	rightMap := make(map[int]int)

	for _, num := range rightCol {
		rightMap[num]++
	}

	for _, num := range letfCol {
		output += rightMap[num] * num
	}

	fmt.Println("Output of Day 1 Part 2:", output)
}
