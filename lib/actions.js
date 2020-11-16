const { searchforPw, setNewPassword, deletePw } = require("./passwords");
const { askForAction } = require("./questions");
const chalk = require("chalk");

async function callforAction(passwordName) {
  if (!passwordName) {
    const { action } = await askForAction();
    console.log(chalk.blue.underline(`You chose to ${action} a password`));
    if (action === "search") {
      await searchforPw(passwordName);
    } else if (action === "add") {
      await setNewPassword(passwordName);
    } else if (action === "delete") {
      await deletePw(passwordName);
    }
  }
}
exports.callforAction = callforAction;
