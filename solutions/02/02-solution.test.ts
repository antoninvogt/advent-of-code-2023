import {
	Game,
	parseGame,
	isConfigurationPossible,
	sumUpAnswer
} from "./02-solution";

describe("Day 02", () => {
	describe("parseGameDraws", () => {
		it("should parse single-digit game IDs", () => {
			const input = "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green";

			const result = parseGame(input);

			expect(result).toEqual(expect.objectContaining({ id: 1 }));
		});

		it("should parse game IDs with multiple digits", () => {
			const input = "Game 123: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green";

			const result = parseGame(input);

			expect(result).toEqual(expect.objectContaining({ id: 123 }));
		});

		it("should parse the draws observed during the game", () => {
			const input = "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green";

			const result = parseGame(input);

			expect(result).toEqual(expect.objectContaining({
				draws: [
					{ red: 4, green: 0, blue: 3 },
					{ red: 1, green: 2, blue: 6 },
					{ red: 0, green: 2, blue: 0 }
				]
			}));
		});
	});

	describe("isConfigurationPossible", () => {
		const puzzleOneConfiguration = { red: 12, green: 13, blue: 14 };

		it("should determine the correct answer for puzzle example 1, line 1", () => {
			const input = [
				{ red: 4, green: 0, blue: 3 },
				{ red: 1, green: 2, blue: 6 },
				{ red: 0, green: 2, blue: 0 }
			];

			const result = isConfigurationPossible(puzzleOneConfiguration, input);

			expect(result).toBe(true);
		});

		it("should determine the correct answer for puzzle example 1, line 2", () => {
			const input = [
				{ red: 0, green: 2, blue: 1 },
				{ red: 1, green: 3, blue: 4 },
				{ red: 0, green: 1, blue: 1 }
			];

			const result = isConfigurationPossible(puzzleOneConfiguration, input);

			expect(result).toBe(true);
		});

		it("should determine the correct answer for puzzle example 1, line 3", () => {
			const input = [
				{ red: 20, green: 8, blue: 6 },
				{ red: 4, green: 13, blue: 5 },
				{ red: 1, green: 5, blue: 0 }
			];

			const result = isConfigurationPossible(puzzleOneConfiguration, input);

			expect(result).toBe(false);
		});

		it("should determine the correct answer for puzzle example 1, line 4", () => {
			const input = [
				{ red: 3, green: 1, blue: 6 },
				{ red: 6, green: 3, blue: 0 },
				{ red: 14, green: 3, blue: 15 }
			];

			const result = isConfigurationPossible(puzzleOneConfiguration, input);

			expect(result).toBe(false);
		});

		it("should determine the correct answer for puzzle example 1, line 5", () => {
			const input = [
				{ red: 6, green: 3, blue: 1 },
				{ red: 1, green: 2, blue: 2 }
			];

			const result = isConfigurationPossible(puzzleOneConfiguration, input);

			expect(result).toBe(true);
		});
	});

	describe("sumUpAnswer", () => {
		it("should sum up the puzzle answer by adding up the IDs of the passed games", () => {
			const input = [
				{ id: 1 },
				{ id: 2 },
				{ id: 5 }
			] as Game[];

			const result = sumUpAnswer(input);

			expect(result).toEqual(8);
		});
	});
});
