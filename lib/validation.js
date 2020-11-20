const { readMasterPassword } = require("./masterPassword");

async function isMasterPasswordCorrect(masterPassword) {
  const secretMasterPassword = readMasterPassword();
  return secretMasterPassword === masterPassword;
}
exports.isMasterPasswordCorrect = isMasterPasswordCorrect;
