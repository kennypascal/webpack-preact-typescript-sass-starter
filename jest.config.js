module.exports = {
  roots: ['<rootDir>/src'],
  setupFiles: ['<rootDir>test/setup.ts'],
  snapshotSerializers: [
    "enzyme-to-json/serializer"
  ],
  transform: {
    '^.+\\.(t|t)sx?$': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^react$': 'preact-compat',
    '^react-dom$': 'preact-compat',
    '\\.(css|less|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(gif|ttf|eot|svg)$': '<rootDir>/__mocks__/fileMock.js'
  },
  testURL: 'https://www.somthing.com/index.html',
  globals: {
    'ts-jest': {
      diagnostics: true
    }
  }
}
