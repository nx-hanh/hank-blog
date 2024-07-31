const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['<rootDir>/src/__tests__/e2e'],
  transform: {
    '^.+\\.svg$': 'jest-transform-stub',
  },
  moduleNameMapper: {
    '^jose': require.resolve('jose'),
    '^@panva/hkdf': require.resolve('@panva/hkdf'),
    '^preact-render-to-string': require.resolve('preact-render-to-string'),
    '^preact': require.resolve('preact'),
    '^uuid': require.resolve('uuid'),
    '@t3-oss/env-core': require.resolve('@t3-oss/env-core'),
  },
};

module.exports = createJestConfig(config);
