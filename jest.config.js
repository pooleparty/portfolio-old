module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  collectCoverageFrom: ['**/*.{ts,tsx}'],
  mapCoverage: true,
  transform: {
    '^.+\\.(j|t)sx?$': '<rootDir>/node_modules/ts-jest/preprocessor.js',
  },
  testMatch: ['**/__tests__/*.(ts|tsx)'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/test/',
    '/src/client/styles/',
    '/src/typings.d.ts',
    '/src/global.d.ts',
    '/src/types.d.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 75,
      lines: 75,
      statements: 75,
    },
  },
  setupFiles: ['./test/setup.js'],
  moduleNameMapper: {
    '\\.(css|jpg|png|svg)$': '<rootDir>/test/empty-module.js',
  },
  watchPathIgnorePatterns: ['<rootDir>/public', '<rootDir>/build'],
};
