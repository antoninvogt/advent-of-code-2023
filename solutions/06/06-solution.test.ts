import {
	parseInput,
	parseBigRace,
	determineRecordInputNumbers,
	determineNumberOfWinningInputs
} from "./06-solution";

describe("Day 06", () => {
	describe("parseInput", () => {
		it("should parse the example input", () => {
			const input = [
				"Time:      7  15   30",
				"Distance:  9  40  200",
				""
			];

			const result = parseInput(input);

			expect(result).toEqual([
				{ time: 7, record: 9 },
				{ time: 15, record: 40 },
				{ time: 30, record: 200 }
			]);
		});
	});

	describe("parseBigRace", () => {
		it("should parse the merged race time and record", () => {
			const input = [
				"Time:      7  15   30",
				"Distance:  9  40  200",
				""
			];

			const result = parseBigRace(input);

			expect(result).toEqual({ time: 71530, record: 940200 });
		});
	});

	describe("determineRecordInputNumbers", () => {
		it("should find the possible inputs for the record time for the first puzzle example", () => {
			const input = { time: 7, record: 9 };

			const result = determineRecordInputNumbers(input);

			expect(result[0]).toBeCloseTo(1.7, 1);
			expect(result[1]).toBeCloseTo(5.3, 1);
		});
	});

	describe("determineNumberOfWinningInputs", () => {
		it("should find the number of ways to win puzzle example race no. 1", () => {
			const input = { time: 7, record: 9 };

			const result = determineNumberOfWinningInputs(input);

			expect(result).toEqual(4);
		});

		it("should find the number of ways to win puzzle example race no. 1", () => {
			const input = { time: 15, record: 40 };

			const result = determineNumberOfWinningInputs(input);

			expect(result).toEqual(8);
		});

		it("should find the number of ways to win puzzle example race no. 3", () => {
			const input = { time: 30, record: 200 };

			const result = determineNumberOfWinningInputs(input);

			expect(result).toEqual(9);
		});
	});
});
