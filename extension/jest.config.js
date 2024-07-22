/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
    testEnvironment: 'jsdom',
    rootDir: 'src',
    transform: {
        '^.+.[jt]sx?$': ['ts-jest', {}],
    },
    transformIgnorePatterns: ['node_modules/(?!(azure-devops-ui)/)'],
}
