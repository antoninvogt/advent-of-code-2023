import FakeTimers from "@sinonjs/fake-timers";

jest.mock("../helpers/solutions");
import {
	getSolverModules,
	getModuleForDay,
	SolverModule
} from "../helpers/solutions";

import {
	getSolutionForDay,
	getAllSolutions
} from "./solutions";

describe("Solutions", () => {
	const dayOneMockResult = [ "something something 1" ];
	const dayTwoMockResult = [ "something something 2" ];

	let dayOneMockModule: SolverModule;
	let dayTwoMockModule: SolverModule;

	beforeEach(() => {
		dayOneMockModule = { solve: jest.fn().mockResolvedValue(dayOneMockResult) };
		dayTwoMockModule = { solve: jest.fn().mockResolvedValue(dayTwoMockResult) };

		// TODO this must be possible more simply
		(getSolverModules as jest.MockedFunction<typeof getSolverModules>).mockResolvedValue([
			{ day: 1, module: dayOneMockModule },
			{ day: 2, module: dayTwoMockModule }
		]);

		(getModuleForDay as jest.MockedFunction<typeof getModuleForDay>).mockImplementation(async (day) => {
			return (day === 1) ? dayOneMockModule : dayTwoMockModule;
		})
	});

	describe("getSolutionForDay", () => {
		it("should attempt to solve the given day", async () => {
			const desiredDay = 1;

			const result = await getSolutionForDay(desiredDay);

			expect(result).toEqual({
				day: 1,
				solution: dayOneMockResult,
				solvedInMs: expect.any(Number)
			});
		});

		describe("Timing", () => {
			beforeAll(() => {
				jest.useFakeTimers();
			});

			beforeEach(() => {
				jest.spyOn(console, "info");
			});

			afterEach(() => {
				(console.info as jest.Mock).mockRestore();
			});

			afterAll(() => {
				jest.useRealTimers();
			});

			it("should report back the time spent on the solution", async () => {
				const executionTime = 1234;

				(dayOneMockModule.solve as jest.MockedFunction<typeof dayOneMockModule.solve>).mockImplementation(async () => {
					return new Promise((resolve, reject) => {
						debugger;
						
						setTimeout(() => {
							debugger;
							
							resolve([ "irrelevant result" ])
						}, executionTime)

						jest.runAllTimers();
					});
				});

				const result = await getSolutionForDay(1);

				expect(result.solvedInMs).toEqual(executionTime);
			});
		});
	});

	describe("getAllSolutions", () => {
		it("should solve all existing days", async () => {
			const result = await getAllSolutions();

			expect(result).toEqual(expect.arrayContaining([
				{ day: 1, solution: dayOneMockResult, solvedInMs: expect.any(Number) },
				{ day: 2, solution: dayTwoMockResult, solvedInMs: expect.any(Number) }
			]));
		});

		it("should return the solutions in the appropriate order", async () => {
			const expectedResult1 = "the expected solution to puzzle 1";
			const expectedResult2 = "the expected solution to puzzle 2";

			(dayOneMockModule.solve as jest.MockedFunction<typeof dayOneMockModule.solve>).mockImplementation(async () => [ expectedResult1 ]);
			(dayTwoMockModule.solve as jest.MockedFunction<typeof dayTwoMockModule.solve>).mockImplementation(async () => [ expectedResult2 ]);

			const result = await getAllSolutions();

			expect.hasAssertions();

			result.forEach((solution, index) => {
				expect(solution).toEqual(expect.objectContaining({ day: index + 1 }));
			});
		});
	});
});
