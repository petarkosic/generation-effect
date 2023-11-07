module.exports = {
	collectCoverage: true,
	collectCoverageFrom: ['src/**/*.{js,jsx}'],
	coverageDirectory: 'coverage',
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['./jest.setup.ts'],
	transform: {
		'^.+\\.ts$': 'ts-jest',
	},
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]s$',
	moduleFileExtensions: ['ts', 'js', 'json', 'node'],
};
