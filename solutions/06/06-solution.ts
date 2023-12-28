import * as inputHelper from "../../helpers/input";

type Race = { time: number, record: number }

function parseInput(inputLines: string[]): Race[] {
	const raceTimesLine = inputLines[0];
	const recordsLine = inputLines[1];

	const raceTimes = raceTimesLine
		.replace(/\s+/g, " ")
		.split(" ")
		.slice(1)
		.map(Number);
	const recordTimes = recordsLine
		.replace(/\s+/g, " ")
		.split(" ")
		.slice(1)
		.map(Number);

	return raceTimes.map((raceTime, index) => {
		return { time: raceTime, record: recordTimes[index] } as Race;
	});
}

function parseBigRace(inputLines: string[]): Race {
	const raceTimesLine = inputLines[0];
	const recordsLine = inputLines[1];

	const raceTime = Number(
		raceTimesLine
		.replace(/Time:\s+/, "")
		.replace(/\s+/g, "")
	);
	const recordTime = Number(
		recordsLine
		.replace(/Distance:\s+/, "")
		.replace(/\s+/g, "")
	);

	return { time: raceTime, record: recordTime };
}

function determineRecordInputNumbers(race: Race): [ number, number ] {
	// D = (time - b) * (t * c), where D is distance, time is race time, b is button push time, and c is speed per time interval the button is pushed (so, 1)
	// After some moving terms around, comes to
	// 0 = b² - time * b + D
	// which, after quadratic formula, is..

	const { time, record } = race;
	const lowerInput = (time - Math.sqrt((-time) ** 2 - 4 * 1 * record)) / 2;
	const higherInput = (time + Math.sqrt((-time) ** 2 - 4 * 1 * record)) / 2;

	return [ lowerInput, higherInput ];
}

function determineNumberOfWinningInputs(race: Race): number {
	const [ lowRecordInput, highRecordInput ] = determineRecordInputNumbers(race);

	const lowestWinningInput = (lowRecordInput % 1 === 0) ? lowRecordInput + 1 : Math.ceil(lowRecordInput);
	const highestWinningInput = (highRecordInput % 1 === 0) ? highRecordInput - 1 : Math.floor(highRecordInput);

	return highestWinningInput - lowestWinningInput + 1;
}

async function solve(): Promise<string[]> {
	const puzzleInput = await inputHelper.readPuzzleInput(__dirname, "./06-input.txt");

	const races = parseInput(puzzleInput);
	const winningInputs = races.map(determineNumberOfWinningInputs);
	const resultOne = winningInputs.reduce((total, next) => total * next, 1);

	const bigRace = parseBigRace(puzzleInput);
	const resultTwo = determineNumberOfWinningInputs(bigRace);

	return [
		String(resultOne),
		String(resultTwo)
	];
}

export {
	parseInput,
	parseBigRace,
	determineRecordInputNumbers,
	determineNumberOfWinningInputs,
	solve
}
