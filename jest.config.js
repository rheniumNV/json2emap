/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "@edge-runtime/jest-environment",
  // The Edge Runtime environment disallows code generation from strings,
  // which Babel/istanbul instrumentation relies on. Use V8's built-in coverage instead.
  coverageProvider: "v8",
};
