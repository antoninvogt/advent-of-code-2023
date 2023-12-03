import * as inputHelper from "../../helpers/input";

function isCharacterPartOfNumber(character: string): boolean {
	return !Number.isNaN(Number(character));
}

function isCharacterSymbol(character: string) {
	return character !== undefined && character !== "." && !isCharacterPartOfNumber(character);
}

function isCoordinateInBounds(engineSchematic: string[], coordinate: [ number, number ]): boolean {
	return coordinate[0] >= 0 && coordinate[0] < engineSchematic.length && coordinate[1] >= 0 && coordinate[1] < engineSchematic[0].length;
}

function collectAdjacentCoordinates(engineSchematic: string[], rowNumber: number, colStart: number, colEnd: number): [ row: number, col: number ][] {
	const adjacentCoordinates: [number, number][] = [];
	
	// row above
	for (let i = colStart - 1; i <= colEnd + 1; i++) {
		adjacentCoordinates.push([ rowNumber - 1, i ]);
	}

	// same row
	adjacentCoordinates.push([ rowNumber, colStart - 1 ]);
	adjacentCoordinates.push([ rowNumber, colEnd + 1 ]);
	
	// row below
	for (let i = colStart - 1; i <= colEnd + 1; i++) {
		adjacentCoordinates.push([ rowNumber + 1, i ]);
	}
	
	return adjacentCoordinates.filter((coordinate) =>  isCoordinateInBounds(engineSchematic, coordinate));
}

function isNumberAdjacentToSymbol(engineSchematic: string[], rowNumber: number, colStart: number, colEnd: number): boolean {
	const adjacentCoordinates = collectAdjacentCoordinates(engineSchematic, rowNumber, colStart, colEnd);

	return adjacentCoordinates.some(([ row, col ]) => isCharacterSymbol(engineSchematic[row][col]));
}

function findPartNumbers(engineSchematic: string[]): number[] {
	const partNumbers: number[] = [];

	for (let rowNumber = 0; rowNumber < engineSchematic.length; rowNumber++) {
		const row = engineSchematic[rowNumber];

		for (let colNumber = 0; colNumber < row.length; colNumber++) {
			if (!isCharacterPartOfNumber(row[colNumber])) { continue; }

			const startColNumber = colNumber;
			let endColNumber = colNumber;
			let runningNumberString = row[colNumber];

			while (isCharacterPartOfNumber(row[++colNumber])) {
				runningNumberString += row[colNumber];
				endColNumber = colNumber;
			}

			if (isNumberAdjacentToSymbol(engineSchematic, rowNumber, startColNumber, endColNumber)) {
				partNumbers.push(Number(runningNumberString));
			}
		}
	}
	
	return partNumbers;
}

async function solve(): Promise<string[]> {
	const puzzleInput = await inputHelper.readPuzzleInput(__dirname, "./03-input.txt");

	const partNumbers = findPartNumbers(puzzleInput);
	const summedUpPartNumbers = partNumbers.reduce((total, partNumber) => total + partNumber, 0);

	return [
		String(summedUpPartNumbers)
	];
}

export {
	findPartNumbers,
	solve
}
