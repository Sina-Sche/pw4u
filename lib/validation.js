const { readMasterPassword } = require("./masterPassword");

async function isMasterPasswordCorrect(masterPassword) {
  const secretMasterPassword = await readMasterPassword();
  return secretMasterPassword === masterPassword;
}
exports.isMasterPasswordCorrect = isMasterPasswordCorrect;
