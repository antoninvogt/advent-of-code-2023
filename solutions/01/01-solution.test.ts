import {
	readDigitsFromLine,
	calculateResultSum
} from "./01-solution";

describe("Day 01", () => {
	describe("readDigitsFromLine", () => {
		const puzzleInputLines = [
			"1abc2",
			"pqr3stu8vwx",
			"a1b2c3d4e5f",
			"treb7uche"
		];

		it("should read the appropriate numbers from puzzle example no. 1", () => {
			const input = puzzleInputLines[0];

			const result = readDigitsFromLine(input);

			expect(result).toEqual([ 1, 2 ]);
		});

		it("should read the appropriate numbers from puzzle example no. 2", () => {
			const input = puzzleInputLines[1];

			const result = readDigitsFromLine(input);

			expect(result).toEqual([ 3, 8 ]);
		});

		it("should read the appropriate numbers from puzzle example no. 3", () => {
			const input = puzzleInputLines[2];

			const result = readDigitsFromLine(input);

			expect(result).toEqual([ 1, 5 ]);
		});

		it("should read the appropriate numbers from puzzle example no. 4", () => {
			const input = puzzleInputLines[3];

			const result = readDigitsFromLine(input);

			expect(result).toEqual([ 7, 7 ]);
		});

		it("should only account for one digit in each place, even if they are adjacent in the input", () => {
			const input = "76xkqjzqtwonfour";

			const result = readDigitsFromLine(input);

			expect(result).toEqual([ 7, 6 ]);
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
