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
		"seeds: 79 14 55 13\n",
		"\n",
		"seed-to-soil map:\n",
		"50 98 2\n",
		"52 50 48\n",
		"\n",
		"soil-to-fertilizer map:\n",
		"0 15 37\n",
		"37 52 2\n",
		"39 0 15\n",
		"\n",
		"fertilizer-to-water map:\n",
		"49 53 8\n",
		"0 11 42\n",
		"42 0 7\n",
		"57 7 4\n",
		"\n",
		"water-to-light map:\n",
		"88 18 7\n",
		"18 25 70\n",
		"\n",
		"light-to-temperature map:\n",
		"45 77 23\n",
		"81 45 19\n",
		"68 64 13\n",
		"\n",
		"temperature-to-humidity map:\n",
		"0 69 1\n",
		"1 0 69\n",
		"\n",
		"humidity-to-location map:\n",
		"60 56 37\n",
		"56 93 4\n",
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
