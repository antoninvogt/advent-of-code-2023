import {
	findPartNumbers
} from "./03-solution";

describe("Day 03", () => {
	describe("findPartNumbers", () => {
		it("should return the appropriate part numbers for the puzzle example", () => {
			const input = [
				"467..114..",
				"...*......",
				"..35..633.",
				"......#...",
				"617*......",
				".....+.58.",
				"..592.....",
				"......755.",
				"...$.*....",
				".664.598.."
			];

			const result = findPartNumbers(input);

			expect(result).toEqual(expect.arrayContaining([ 467, 35, 633, 617, 592, 755, 664, 598 ]));
			expect(result).toHaveLength(8);
		});
	});
});
