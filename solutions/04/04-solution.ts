import * as inputHelper from "../../helpers/input";

type Card = {
	winningNumbers: number[]
	drawnNumbers: number[]
}

function parseCard(inputLine: string): Card {
	const [ winningNumbers, drawnNumbers ] = inputLine
		.split(": ")[1]
		.split(" | ")
		.map((numbersString) => numbersString.replace(/\s+/g, " "))
		.map((trimmedNumberString) => trimmedNumberString.split(" "))
		.map((splitNumberString) => splitNumberString.map((numberCharacters) => Number(numberCharacters)));

	return {
		winningNumbers,
		drawnNumbers
	}
}

function determineCardValue(card: Card): number {
	return card.drawnNumbers.reduce((total, drawnNumber) => {
		if (card.winningNumbers.includes(drawnNumber)) {
			total = (total * 2) || 1;
		}

		return total;
	}, 0);
}

async function solve(): Promise<string[]> {
	const puzzleInput = await inputHelper.readPuzzleInput(__dirname, "./04-input.txt");

	const cards = puzzleInput.map(parseCard);
	const cardValues = cards.map(determineCardValue);
	const totalCardValues = cardValues.reduce((total, cardValue) => total + cardValue, 0);

	return [
		String(totalCardValues)
	];
}

export {
	parseCard,
	determineCardValue,
	solve
}
