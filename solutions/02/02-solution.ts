import * as inputHelper from "../../helpers/input";

type CubeColor = "red" | "green" | "blue";
interface CubeNumbers extends Record<CubeColor, number> {
	red: number
	green: number
	blue: number
}
type BagContents = CubeNumbers
type Game = {
	id: number
	draws: CubeNumbers[]
};

function parseGame(puzzleInputLine: string): Game {
	const [ idPrefix, gameRecord ] = puzzleInputLine.split(": ")
	const gameId = Number(idPrefix.substring("Game ".length));
	const drawRecords = gameRecord.split("; ");

	const parsedDraws = drawRecords.map((drawRecord) => {
		const colorsDrawn = drawRecord.split(", ");

		return colorsDrawn.reduce((draws, colorDrawn) => {
			const [ number, color ] = colorDrawn.split(" ") as [ string, CubeColor ];

			draws[color] += Number(number);

			return draws;
		}, { red: 0, green: 0, blue: 0 });
	})
	
	return {
		id: gameId,
		draws: parsedDraws
	};
}

function isConfigurationPossible(bagContents: BagContents, gameDraws: CubeNumbers[]): boolean {
	return gameDraws.every((draw) => {
		return draw.red <= bagContents.red && draw.green <= bagContents.green && draw.blue <= bagContents.blue;
	});
}

function determineFewestPossibleCubes(game: Game): BagContents {
	return game.draws.reduce((fewestCubes, draw) => {
		return {
			red: Math.max(draw.red, fewestCubes.red),
			green: Math.max(draw.green, fewestCubes.green),
			blue: Math.max(draw.blue, fewestCubes.blue)
		};
	}, { red: 0, green: 0, blue: 0 });
}

function sumUpGameIds(games: Game[]): number {
	return games.reduce((total, game) => total + game.id, 0);
}

function sumUpCubePowers(fewestCubeConfigs: BagContents[]): number {
	return fewestCubeConfigs.reduce((total, cubes) => total + cubes.red * cubes.green * cubes.blue, 0);
}

async function solve(): Promise<string[]> {
	const puzzleInput = await inputHelper.readPuzzleInput(__dirname, "./02-input.txt");
	const allegedBagContents = { red: 12, green: 13, blue: 14 };
	
	const games = puzzleInput.map(parseGame);
	const validGames = games.filter((game) => isConfigurationPossible(allegedBagContents, game.draws));
	const partOneAnswer = sumUpGameIds(validGames);

	const minimalCubeConfigs = games.map(determineFewestPossibleCubes);
	const partTwoAnswer = sumUpCubePowers(minimalCubeConfigs);
	
	return [
		String(partOneAnswer),
		String(partTwoAnswer)
	];
}

export {
	Game,
	parseGame,
	isConfigurationPossible,
	determineFewestPossibleCubes,
	sumUpGameIds,
	sumUpCubePowers,
	solve
}
