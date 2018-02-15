module.exports = {
  moduleFileExtensions: ["ts", "tsx", "js"],
  collectCoverageFrom: ["**/*.{ts,tsx}"],
  mapCoverage: true,
  transform: {
    "^.+\\.(j|t)sx?$": "<rootDir>/node_modules/ts-jest/preprocessor.js"
  },
  testMatch: ["**/__tests__/*.(ts|tsx)"],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/test/",
    "/src/typings.d.ts",
    "/src/global.d.ts",
    "/src/types.d.ts"
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 85,
      lines: 95,
      statements: 95
    }
  },
  setupFiles: ["./test/setup.js"],
  moduleNameMapper: {
    "\\.(css|jpg|png|svg)$": "<rootDir>/test/empty-module.js"
  },
  watchPathIgnorePatterns: ["<rootDir>/public", "<rootDir>/build"]
};
