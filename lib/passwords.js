const CryptoJS = require("crypto-js");
const { readMasterPassword } = require("./masterPassword");
const {
  setCollection,
  replaceOne,
  findPwfor,
  deleteOne,
} = require("./database");
const { whichPassword, getNewPasswordValue } = require("./questions");

async function getPassword(passwordName) {
  const entry = await findPwfor(passwordName);
  if (entry) {
    const pwdBytes = CryptoJS.AES.decrypt(
      entry.value,
      await readMasterPassword()
    );
    const pwd = pwdBytes.toString(CryptoJS.enc.Utf8);
    console.log(`Your ${passwordName} password is: ${pwd}`);
    return pwd;
  } else {
    console.log("This password does not exist!");
  }
}

async function setPassword(passwordName, newPasswordValue) {
  const encryptedValue = CryptoJS.AES.encrypt(
    newPasswordValue,
    await readMasterPassword()
  ).toString();
  const collection = await setCollection("passwords");
  const newPwObject = {
    name: passwordName,
    value: encryptedValue,
  };
  await replaceOne(collection, newPwObject);
}
async function setNewPassword() {
  const passwordName = await whichPassword();
  console.log(passwordName);
  const newPasswordValue = await getNewPasswordValue();
  console.log(newPasswordValue);
  await setPassword(passwordName, newPasswordValue);
  console.log(
    `Your ${passwordName} password has been set to ${newPasswordValue}!`
  );
}
async function searchforPw(passwordName) {
  if (!passwordName) {
    const passwordName = await whichPassword();
    await getPassword(passwordName);
  } else {
    await getPassword(passwordName);
  }
}

async function deletePw(passwordName) {
  if (!passwordName) {
    const passwordName = await whichPassword();
    deleteOne(passwordName);
  } else {
    deleteOne(passwordName);
  }
}

exports.getPassword = getPassword;
exports.setPassword = setPassword;
exports.searchforPw = searchforPw;
exports.setNewPassword = setNewPassword;
exports.deletePw = deletePw;
