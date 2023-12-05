import {
	MapIdentifier,
	Map,
	parseSeeds,
	parseMap,
	findCorrespondingNumber,
	resolveNumber,
	findSmallestLocationForPuzzleInput
} from './05-solution'

describe("Day 05", () => {
	const examplePuzzleInput = [
		"seeds: 79 14 55 13",
		"",
		"seed-to-soil map:",
		"50 98 2",
		"52 50 48",
		"",
		"soil-to-fertilizer map:",
		"0 15 37",
		"37 52 2",
		"39 0 15",
		"",
		"fertilizer-to-water map:",
		"49 53 8",
		"0 11 42",
		"42 0 7",
		"57 7 4",
		"",
		"water-to-light map:",
		"88 18 7",
		"18 25 70",
		"",
		"light-to-temperature map:",
		"45 77 23",
		"81 45 19",
		"68 64 13",
		"",
		"temperature-to-humidity map:",
		"0 69 1",
		"1 0 69",
		"",
		"humidity-to-location map:",
		"60 56 37",
		"56 93 4",
		""
	]

	describe("parseSeeds", () => {
		it("should parse the seeds from the puzzle input", () => {
			const input = examplePuzzleInput.slice();

			const result = parseSeeds(input);

			expect(result).toEqual([ 79, 14, 55, 13 ]);
		});
	});

	describe("parseMap", () => {
		it("should parse the top-most map", () => {
			const input = examplePuzzleInput.slice();
			const mapIdentifier = MapIdentifier.SEED_TO_SOIL;

			const result = parseMap(input, mapIdentifier);

			expect(result).toEqual({
				id: mapIdentifier,
				ranges: [
					[ 50, 98, 2 ],
					[ 52, 50, 48 ]
				]
			});
		});

		it("should parse the bottom-most map", () => {
			const input = examplePuzzleInput.slice();
			const mapIdentifier = MapIdentifier.HUMIDITY_TO_LOCATION;

			const result = parseMap(input, mapIdentifier);

			expect(result).toEqual({
				id: mapIdentifier,
				ranges: [
					[ 60, 56, 37 ],
					[ 56, 93, 4 ]
				]
			});
		});
	});

	describe("findCorrespondingNumber", () => {
		it("should find the appropriate soil numbers for the seeds from the example", () => {
			const seedToSoilMap = {
				id: MapIdentifier.SEED_TO_SOIL,
				ranges: [
					[ 50, 98, 2 ],
					[ 52, 50, 48 ]
				]
			} as Map;

			const result = [
				findCorrespondingNumber(seedToSoilMap, 79),
				findCorrespondingNumber(seedToSoilMap, 14),
				findCorrespondingNumber(seedToSoilMap, 55),
				findCorrespondingNumber(seedToSoilMap, 13)
			];

			expect(result).toEqual([ 81, 14, 57, 13 ]);
		});

		it("should handle a case where the destination range starts at 0", () => {
			const seedToSoilMap = {
				id: MapIdentifier.SEED_TO_SOIL,
				ranges: [
					[ 0, 50, 5 ]
				]
			} as Map;

			const result = findCorrespondingNumber(seedToSoilMap, 51);

			expect(result).toEqual(1);
		});

		it("should handle a case where the source range starts at 0", () => {
			const seedToSoilMap = {
				id: MapIdentifier.SEED_TO_SOIL,
				ranges: [
					[ 50, 0, 5 ]
				]
			} as Map;

			const result = findCorrespondingNumber(seedToSoilMap, 1);

			expect(result).toEqual(51);
		});

		it("should handle a case where the source number is above the source range", () => {
			const seedToSoilMap = {
				id: MapIdentifier.SEED_TO_SOIL,
				ranges: [
					[ 50, 0, 5 ]
				]
			} as Map;

			const result = findCorrespondingNumber(seedToSoilMap, 6);

			expect(result).toEqual(6);
		});

		it("should handle a case where the source number is below the source range", () => {
			const seedToSoilMap = {
				id: MapIdentifier.SEED_TO_SOIL,
				ranges: [
					[ 100, 50, 5 ]
				]
			} as Map;

			const result = findCorrespondingNumber(seedToSoilMap, 49);

			expect(result).toEqual(49);
		});
	});

	describe("resolveNumber", () => {
		const exampleMaps = [
			{
				id: MapIdentifier.SEED_TO_SOIL,
				ranges: [
					[ 50, 98, 2 ],
					[ 52, 50, 48 ]
				]
			},
			{
				id: MapIdentifier.SOIL_TO_FERTILIZER,
				ranges: [
					[ 0, 15, 37 ],
					[ 37, 52, 2 ],
					[ 39, 0, 15 ]
				]
			},
			{
				id: MapIdentifier.FERTILIZER_TO_WATER,
				ranges: [
					[ 49, 53, 8 ],
					[ 0, 11, 42 ],
					[ 42, 0, 7 ],
					[ 57, 7, 4 ]
				]
			},
			{
				id: MapIdentifier.WATER_TO_LIGHT,
				ranges: [
					[ 88, 18, 7 ],
					[ 18, 25, 70 ]
				]
			},
			{
				id: MapIdentifier.LIGHT_TO_TEMPERATURE,
				ranges: [
					[ 45, 77, 23 ],
					[ 81, 45, 19 ],
					[ 68, 64, 13 ]
				]
			},
			{
				id: MapIdentifier.TEMPERATURE_TO_HUMIDITY,
				ranges: [
					[ 0, 69, 1 ],
					[ 1, 0, 69 ]
				]
			},
			{
				id: MapIdentifier.HUMIDITY_TO_LOCATION,
				ranges: [
					[ 60, 56, 37 ],
					[ 56, 93, 4 ]
				]
			}
		] as Map[];

		it("should pipe the number through all given maps and resolve the seed number from the puzzle example", () => {
			const result = [
				resolveNumber(exampleMaps, 79),
				resolveNumber(exampleMaps, 14),
				resolveNumber(exampleMaps, 55),
				resolveNumber(exampleMaps, 13)
			];

			expect(result).toEqual([ 82, 43, 86, 35 ]);
		});
	});

	describe("findSmallestLocationForPuzzleInput", () => {
		it("should find the smallest location for the puzzle example", () => {
			const result = findSmallestLocationForPuzzleInput(examplePuzzleInput);

			expect(result).toEqual(35);
		});
	});
});
