import {
	Game,
	parseGame,
	isConfigurationPossible,
	determineFewestPossibleCubes,
	sumUpGameIds,
	sumUpCubePowers
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

	describe("determineFewestPossibleCubes", () => {
		it("should determine the correct answer for puzzle example 2, game 1", () => {
			const input = {
				id: 1,
				draws: [
					{ red: 4, green: 0, blue: 3 },
					{ red: 1, green: 2, blue: 6 },
					{ red: 0, green: 2, blue: 0 }
				]
			};

			const result = determineFewestPossibleCubes(input);

			expect(result).toEqual({ red: 4, green: 2, blue: 6 });
		});

		it("should determine the correct answer for puzzle example 2, game 2", () => {
			const input = {
				id: 2,
				draws: [
					{ red: 0, green: 2, blue: 1 },
					{ red: 1, green: 3, blue: 4 },
					{ red: 0, green: 1, blue: 1 }
				]
			};

			const result = determineFewestPossibleCubes(input);

			expect(result).toEqual({ red: 1, green: 3, blue: 4 });
		});

		it("should determine the correct answer for puzzle example 2, game 3", () => {
			const input = {
				id: 3,
				draws: [
					{ red: 20, green: 8, blue: 6 },
					{ red: 4, green: 13, blue: 5 },
					{ red: 1, green: 5, blue: 0 }
				]
			};

			const result = determineFewestPossibleCubes(input);

			expect(result).toEqual({ red: 20, green: 13, blue: 6 });
		});

		it("should determine the correct answer for puzzle example 2, game 4", () => {
			const input = {
				id: 4,
				draws: [
					{ red: 3, green: 1, blue: 6 },
					{ red: 6, green: 3, blue: 0 },
					{ red: 14, green: 3, blue: 15 }
				]
			};

			const result = determineFewestPossibleCubes(input);

			expect(result).toEqual({ red: 14, green: 3, blue: 15 });
		});

		it("should determine the correct answer for puzzle example 2, game 5", () => {
			const input = {
				id: 5,
				draws: [
					{ red: 6, green: 3, blue: 1 },
					{ red: 1, green: 2, blue: 2 }
				]
			};

			const result = determineFewestPossibleCubes(input);

			expect(result).toEqual({ red: 6, green: 3, blue: 2 });
		});
	});

	describe("sumUpGameIds", () => {
		it("should sum up the puzzle answer by adding up the IDs of the passed games", () => {
			const input = [
				{ id: 1 },
				{ id: 2 },
				{ id: 5 }
			] as Game[];

			const result = sumUpGameIds(input);

			expect(result).toEqual(8);
		});
	});

	describe("sumUpCubePowers", () => {
		it("should sum up the powers of the list of minimal possible cube numbers",  () => {
			const input = [
				{ red: 4, green: 2, blue: 6 },
				{ red: 1, green: 3, blue: 4 },
				{ red: 20, green: 13, blue: 6 },
				{ red: 14, green: 3, blue: 15 },
				{ red: 6, green: 3, blue: 2 }
			];

			const result = sumUpCubePowers(input);

			expect(result).toEqual(2286);
		});
	});
});
