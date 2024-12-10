package main

import (
	"fmt"
	"regexp"
	"strconv"
)

func day3_1(input string) {
	output := 0
	r, _ := regexp.Compile(`mul\(\d+,\d+\)`)

	multiplications := r.FindAllString(input, -1)
	output = parseAndMultiply(multiplications)

	fmt.Println("Output Day 1 Part 1", output)
}

func day3_2(input string) {
	output := 0
	r, _ := regexp.Compile(`mul\(\d+,\d+\)|don't\(\)|do\(\)`)

	multiplications := r.FindAllString(input, -1)
	output = parseAndMultiplyWithCondition(multiplications)

	fmt.Println("Output Day 1 Part 2", output)
}

func parseAndMultiply(multStrings []string) int {
	r, _ := regexp.Compile(`\d+`)
	result := 0

	for _, values := range multStrings {
		nums := r.FindAllString(values, -1)
		first, _ := strconv.Atoi(nums[0])
		second, _ := strconv.Atoi(nums[1])

		result += first * second
	}

	return result
}

func parseAndMultiplyWithCondition(multStrings []string) int {
	r, _ := regexp.Compile(`\d+`)
	result := 0
	multiply := true

	for _, values := range multStrings {
		nums := r.FindAllString(values, -1)

		if multiply && len(nums) > 1 {
			first, _ := strconv.Atoi(nums[0])
			second, _ := strconv.Atoi(nums[1])
			result += first * second
		}

		if values == "do()" {
			multiply = true
		} else if values == "don't()" {
			multiply = false
		}
	}

	return result
}
