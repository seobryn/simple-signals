/** @returns {Promise<import('jest').Config>} */
module.exports = async () => {
  return {
    preset: "ts-jest",
    verbose: true,
  };
};
