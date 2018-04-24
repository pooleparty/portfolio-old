module.exports = {
  moduleFileExtensions: ['js'],
  collectCoverageFrom: ['**/*.{js}'],
  mapCoverage: true,
  testMatch: ['**/__tests__/*.(js)'],
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
      branches: 90,
      functions: 85,
      lines: 95,
      statements: 95,
    },
  },
  setupFiles: ['./test/setup.js'],
  moduleNameMapper: {
    '\\.(css|jpg|png|svg)$': '<rootDir>/test/empty-module.js',
  },
  watchPathIgnorePatterns: ['<rootDir>/public', '<rootDir>/build'],
};
