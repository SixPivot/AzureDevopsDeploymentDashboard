/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
    verbose: true,
    testEnvironment: 'jsdom',
    rootDir: 'src',
    extensionsToTreatAsEsm: ['.ts', '.tsx', '.jsx'],
    // transformIgnorePatterns: ["node_modules/(?!(azure-devops-ui)/)"],
    transform: {},
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}
