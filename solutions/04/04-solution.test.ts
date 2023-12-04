import {
	parseCard,
	determineCardValue
} from "./04-solution";

describe("Day 04", () => {
	describe("parseCard", () => {
		it("should parse an input line", () => {
			const input = "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53";

			const result = parseCard(input);

			expect(result).toEqual({
				winningNumbers: [ 41, 48, 83, 86, 17 ],
				drawnNumbers: [ 83, 86, 6, 31, 17, 9, 48, 53 ]
			});
		});
	});

	describe("determineCardValue", () => {
		it("should determine the appropriate worth card no. 1 from the puzzle example", () => {
			const input = {
				winningNumbers: [ 41, 48, 83, 86, 17 ],
				drawnNumbers: [ 83, 86, 6, 31, 17, 9, 48, 53 ]
			};

			const result = determineCardValue(input);

			expect(result).toEqual(8);
		});

		it("should determine the appropriate worth card no. 2 from the puzzle example", () => {
			const input = {
				winningNumbers: [ 13, 32, 20, 16, 61 ],
				drawnNumbers: [ 61, 30, 68, 82, 17, 32, 24, 19 ]
			};

			const result = determineCardValue(input);

			expect(result).toEqual(2);
		});

		it("should determine the appropriate worth card no. 3 from the puzzle example", () => {
			const input = {
				winningNumbers: [ 1, 21, 53, 59, 44 ],
				drawnNumbers: [ 69, 82, 63, 72, 16, 21, 14, 1 ]
			};

			const result = determineCardValue(input);

			expect(result).toEqual(2);
		});

		it("should determine the appropriate worth card no. 4 from the puzzle example", () => {
			const input = {
				winningNumbers: [ 41, 92, 73, 84, 69 ],
				drawnNumbers: [ 59, 84, 76, 51, 58, 5, 54, 83 ]
			};

			const result = determineCardValue(input);

			expect(result).toEqual(1);
		});

		it("should determine the appropriate worth card no. 5 from the puzzle example", () => {
			const input = {
				winningNumbers: [ 87, 83, 26, 28, 32 ],
				drawnNumbers: [ 88, 30, 70, 12, 93, 22, 82, 36 ]
			};

			const result = determineCardValue(input);

			expect(result).toEqual(0);
		});

		it("should determine the appropriate worth card no. 6 from the puzzle example", () => {
			const input = {
				winningNumbers: [ 31, 18, 13, 56, 72 ],
				drawnNumbers: [ 74, 77, 10, 23, 35, 67, 36, 11 ]
			};

			const result = determineCardValue(input);

			expect(result).toEqual(0);
		});
	});
});
