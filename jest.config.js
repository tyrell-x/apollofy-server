module.exports = {
  testEnvironment: "node",
  /**
   * for: mongodb-memory-server
   * May require additional time for downloading MongoDB binaries
   */
  testTimeout: 600000,
  collectCoverage: true,
  collectCoverageFrom: ["*.{js}", "!**/node_modules/**"],
  // roots: ["packages/"]
};
