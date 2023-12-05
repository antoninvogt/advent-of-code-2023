import * as inputHelper from "../../helpers/input";

enum MapIdentifier {
	SEED_TO_SOIL = "seed-to-soil",
	SOIL_TO_FERTILIZER = "soil-to-fertilizer",
	FERTILIZER_TO_WATER = "fertilizer-to-water",
	WATER_TO_LIGHT = "water-to-light",
	LIGHT_TO_TEMPERATURE = "light-to-temperature",
	TEMPERATURE_TO_HUMIDITY = "temperature-to-humidity",
	HUMIDITY_TO_LOCATION = "humidity-to-location"
}

type Range = [
	destinationRangeStart: number,
	sourceRangeStart: number,
	rangeLength: number
]

type Map = {
	id: MapIdentifier
	ranges: Range[]
}

function parseSeeds(puzzleInput: string[]): number[] {
	return puzzleInput[0]
		.split(": ")[1]
		.split(" ")
		.map(Number);
}

function parseMap(puzzleInput: string[], mapIdentifier: MapIdentifier): Map {
	const headingIndex = puzzleInput.findIndex((puzzleInputLine) => puzzleInputLine.startsWith(mapIdentifier));
	const mapLength = puzzleInput.slice(headingIndex).findIndex((puzzleInputLine) => puzzleInputLine === "\n");
	const rangeEndIndex = (mapLength !== -1) ? headingIndex + mapLength : puzzleInput.length - 1;
	const relevantLines = puzzleInput.slice(headingIndex + 1, rangeEndIndex);

	return {
		id: mapIdentifier,
		ranges: relevantLines
			.map((line) => line.replace("\n", ""))
			.map((line) => line.split(" "))
			.map((splitLine) => splitLine.map(Number) as Range)
	}
}

function findCorrespondingNumber(lookupMap: Map, currentNumber: number): number {
	let correspondingNumber = currentNumber;

	for (let [ destinationRangeStart, sourceRangeStart, rangeLength ] of lookupMap.ranges) {
		if (currentNumber >= sourceRangeStart && currentNumber <= sourceRangeStart + rangeLength) {
			const deltaFromRangeStart = currentNumber - sourceRangeStart;

			correspondingNumber = destinationRangeStart + deltaFromRangeStart;

			break;
		}
	}

	return correspondingNumber;
}

function resolveNumber(maps: Map[], initialNumber: number): number {
	return maps.reduce((mappedNumber, map) => findCorrespondingNumber(map, mappedNumber), initialNumber);
}

function findSmallestLocationForPuzzleInput(puzzleInput: string[]): number {
	const seedNumbers = parseSeeds(puzzleInput);
	const mapsPipe = [
		parseMap(puzzleInput, MapIdentifier.SEED_TO_SOIL),
		parseMap(puzzleInput, MapIdentifier.SOIL_TO_FERTILIZER),
		parseMap(puzzleInput, MapIdentifier.FERTILIZER_TO_WATER),
		parseMap(puzzleInput, MapIdentifier.WATER_TO_LIGHT),
		parseMap(puzzleInput, MapIdentifier.LIGHT_TO_TEMPERATURE),
		parseMap(puzzleInput, MapIdentifier.TEMPERATURE_TO_HUMIDITY),
		parseMap(puzzleInput, MapIdentifier.HUMIDITY_TO_LOCATION)
	];

	const seedLocations = seedNumbers.map((seedNumber) => resolveNumber(mapsPipe, seedNumber));

	return Math.min(...seedLocations);
}

async function solve(): Promise<string[]> {
	const puzzleInput = await inputHelper.readPuzzleInputPreservingWhiteLines(__dirname, "./05-input.txt");

	const smallestLocation = findSmallestLocationForPuzzleInput(puzzleInput);

	return [
		String(smallestLocation)
	];
}

export {
	MapIdentifier,
	Map,
	parseSeeds,
	parseMap,
	findCorrespondingNumber,
	resolveNumber,
	findSmallestLocationForPuzzleInput,
	solve
}
