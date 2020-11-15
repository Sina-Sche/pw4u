const inquirer = require("inquirer");
const chalk = require("chalk");

async function askForMasterPassword() {
  const { masterPassword } = await inquirer.prompt([
    {
      type: "password",
      name: "masterPassword",
      message: "🔐 Enter your master password to continue:",
      mask: "*",
    },
  ]);
  return masterPassword;
}

async function askForAction() {
  const action = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
        {
          key: "s",
          name: "🔎 Look up a password",
          value: "search",
          short: "search",
        },
        {
          key: "a",
          name: "🔐 Update an existing password or add a new one",
          value: "add",
          short: "add",
        },
        {
          key: "d",
          name: "❌ Delete a password",
          value: "delete",
          short: "delete",
        },
      ],
    },
  ]);
  return action;
}

async function whichPassword() {
  const { passwordName } = await inquirer.prompt([
    {
      type: "input",
      name: "passwordName",
      message: "Please specify which password: ",
    },
  ]);
  return passwordName;
}

async function getNewPasswordValue() {
  const { newPasswordValue } = await inquirer.prompt([
    {
      type: "input",
      name: "newPasswordValue",
      message: "Please set your new password: ",
    },
  ]);
  return newPasswordValue;
}

async function doubleCheck() {
  const { answer } = await inquirer.prompt([
    {
      type: "confirm",
      name: "answer",
      message: `Are you sure you want to update this password?`,
    },
  ]);
  return answer;
}
exports.askForMasterPassword = askForMasterPassword;
exports.askForAction = askForAction;
exports.whichPassword = whichPassword;
exports.getNewPasswordValue = getNewPasswordValue;
exports.doubleCheck = doubleCheck;
