/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: "ts-jest/presets/js-with-ts-esm",
  testEnvironment: "jsdom",
  rootDir: "src",
  globals: {"useESM": true,},
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
  extensionsToTreatAsEsm: [".ts"],
  transformIgnorePatterns: ["node_modules/(?!(azure-devops-ui)/)"],
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
};