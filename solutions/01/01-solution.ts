import * as inputHelper from "../../helpers/input";

type SpelledOutDigit = "one"|"two"|"three"|"four"|"five"|"six"|"seven"|"eight"|"nine";

const numbersForWords: Record<SpelledOutDigit, number> = {
	one: 1,
	two: 2,
	three: 3,
	four: 4,
	five: 5,
	six: 6,
	seven: 7,
	eight: 8,
	nine: 9
}

function readPureDigitsFromLine(inputLine: string): [ number, number ] {
	const firstDigitMatcher = (/^\D*?(\d)/);
	const secondDigitMatcher = (/(\d)\D*$/);

	const firstDigitMatches = inputLine.match(firstDigitMatcher)!;
	const secondDigitMatches = inputLine.match(secondDigitMatcher)!;

	return [ Number(firstDigitMatches[1]), Number(secondDigitMatches[1]) ];
}

function readNumberFromMatch(match: string): number {
	const parsedInteger = parseInt(match, 10);
	
	return (!Number.isNaN(parsedInteger)) ? parsedInteger : numbersForWords[match as SpelledOutDigit]
}

function captureOverlappingMatches(regExpLiteral: RegExp, testString: string): string[] {
	const matches = [];
	let currentMatch;
	
	const matcher = new RegExp(regExpLiteral);

	while (currentMatch = matcher.exec(testString)) {
		const matchedDigit = currentMatch[0]
		
		matches.push(matchedDigit);
		
		if (matchedDigit.length > 1) {
			// move index back to one character after the last match to allow overlapping words to be captured (like in "twone", which should capture "two" and then "one")
			
			matcher.lastIndex = currentMatch.index + 1;
		}
	}
	
	return matches;
}

function readAllDigitsFromLine(inputLine: string): [ number, number ] {
	const allMatches = captureOverlappingMatches(/(\d|one|two|three|four|five|six|seven|eight|nine)/g, inputLine)!;

	const firstDigit = readNumberFromMatch(allMatches[0]);
	const secondDigit = readNumberFromMatch(allMatches[allMatches.length - 1]);

	return [ firstDigit, secondDigit ];
}

function calculateResultSum(digitPairs: [ number, number ][]): number {
	return digitPairs.reduce((total, nextPair) => {
		return total + Number(nextPair.join(""));
	}, 0);
}

async function solve(): Promise<string[]> {
	const puzzleInput = await inputHelper.readPuzzleInput(__dirname, "./01-input.txt");

	const resultPartOne = calculateResultSum(puzzleInput.map(readPureDigitsFromLine));
	const resultPartTwo = calculateResultSum(puzzleInput.map(readAllDigitsFromLine));

	return [
		String(resultPartOne),
		String(resultPartTwo)
	];
}

export {
	readPureDigitsFromLine,
	readAllDigitsFromLine,
	calculateResultSum,
	solve
}
