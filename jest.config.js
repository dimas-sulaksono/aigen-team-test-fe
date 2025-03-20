/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
const nextJest = require("next/jest");
/** @type {import('jest').Config} */

// biar jest bisa ngebaca config next dan .env di projek kita
const createJestConfig = nextJest({
  dir: "./",
});

const config = {
  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  // collectCoverageFrom: undefined,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@/components(.*)$": "<rootDir>/src/components/$1",
    "^@/services(.*)$": "<rootDir>/src/services/$1",
  },

  // The test environment that will be used for testing
  testEnvironment: "jsdom",
};

module.exports = createJestConfig(config);
