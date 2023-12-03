import * as inputHelper from "../../helpers/input";

function readDigitsFromLine(inputLine: string): [ number, number ] {
	const firstDigitMatcher = (/^\D*?(\d)/);
	const secondDigitMatcher = (/(\d)\D*$/);

	const firstDigitMatches = inputLine.match(firstDigitMatcher)!;
	const secondDigitMatches = inputLine.match(secondDigitMatcher)!;
	
	return [ Number(firstDigitMatches[1]), Number(secondDigitMatches[1]) ];
}

function calculateResultSum(digitPairs: [ number, number ][]): number {
	return digitPairs.reduce((total, nextPair) => {
		return total + Number(nextPair.join(""));
	}, 0);
}

async function solve(): Promise<string[]> {
	const puzzleInput = await inputHelper.readPuzzleInput(__dirname, "./01-input.txt");

	const digitPairs = puzzleInput.map(readDigitsFromLine);
	const resultPartOne = calculateResultSum(digitPairs);

	return [
		String(resultPartOne)
	];
}

export {
	readDigitsFromLine,
	calculateResultSum,
	solve
}
