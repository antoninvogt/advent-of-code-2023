import {
	readPureDigitsFromLine,
	readAllDigitsFromLine,
	calculateResultSum
} from "./01-solution";

describe("Day 01", () => {
	describe("readDigitsFromLine", () => {
		describe("readPureDigitsFromLine", () => {
			const puzzleInputLines = [
				"1abc2",
				"pqr3stu8vwx",
				"a1b2c3d4e5f",
				"treb7uche"
			];

			it("should read the appropriate numbers from line 1", () => {
				const input = puzzleInputLines[0];

				const result = readPureDigitsFromLine(input);

				expect(result).toEqual([1, 2]);
			});

			it("should read the appropriate numbers from line 2", () => {
				const input = puzzleInputLines[1];

				const result = readPureDigitsFromLine(input);

				expect(result).toEqual([3, 8]);
			});

			it("should read the appropriate numbers from line 3", () => {
				const input = puzzleInputLines[2];

				const result = readPureDigitsFromLine(input);

				expect(result).toEqual([1, 5]);
			});

			it("should read the appropriate numbers from line 4", () => {
				const input = puzzleInputLines[3];

				const result = readPureDigitsFromLine(input);

				expect(result).toEqual([7, 7]);
			});

			it("should only account for one digit in each place, even if they are adjacent in the input", () => {
				const input = "76xkqjzqtwonfour";

				const result = readPureDigitsFromLine(input);

				expect(result).toEqual([ 7, 6 ]);
			});
		});
		
		describe("readAllDigitsFromLine", () => {
			const puzzleInputLines = [
				"two1nine",
				"eightwothree",
				"abcone2threexyz",
				"xtwone3four",
				"4nineeightseven2",
				"zoneight234",
				"7pqrstsixteen"
			];

			it("should read the appropriate numbers from line 1", () => {
				const input = puzzleInputLines[0];

				const result = readAllDigitsFromLine(input);

				expect(result).toEqual([2, 9]);
			});

			it("should read the appropriate numbers from line 2", () => {
				const input = puzzleInputLines[1];

				const result = readAllDigitsFromLine(input);

				expect(result).toEqual([8, 3]);
			});

			it("should read the appropriate numbers from line 3", () => {
				const input = puzzleInputLines[2];

				const result = readAllDigitsFromLine(input);

				expect(result).toEqual([1, 3]);
			});

			it("should read the appropriate numbers from line 4", () => {
				const input = puzzleInputLines[3];

				const result = readAllDigitsFromLine(input);

				expect(result).toEqual([2, 4]);
			});

			it("should read the appropriate numbers from line 5", () => {
				const input = puzzleInputLines[4];

				const result = readAllDigitsFromLine(input);

				expect(result).toEqual([4, 2]);
			});

			it("should read the appropriate numbers from line 6", () => {
				const input = puzzleInputLines[5];

				const result = readAllDigitsFromLine(input);

				expect(result).toEqual([1, 4]);
			});

			it("should read the appropriate numbers from line 7", () => {
				const input = puzzleInputLines[6];

				const result = readAllDigitsFromLine(input);

				expect(result).toEqual([7, 6]);
			});

			it("should account for two spelled out digits overlapping", () => {
				const input = "3one8ncctmbsixeighttwonegb";

				const result = readAllDigitsFromLine(input);

				expect(result).toEqual([3, 1]);
			});
		});
	});

	describe("calculateResultSum", () => {
		it("should calculate the appropriate puzzle output based on the parsed digit pairs", () => {
			const input = [
				[ 1, 2 ],
				[ 3, 8 ],
				[ 1, 5 ],
				[ 7, 7 ]
			] as [ number, number ][];

			const result = calculateResultSum(input);

			expect(result).toEqual(142);
		});
	});
});
