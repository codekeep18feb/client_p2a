module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
      '\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js',  // Mock CSS
      '\\.(jpg|jpeg|png)$': '<rootDir>/__mocks__/fileMock.js',  // Mock image files
  },
};
