const { readCommandLineArguments, welcomeUser } = require("./lib/commandLine");
const {
  getPassword,
  setPassword,
  searchforPw,
  setNewPassword,
  deletePw,
} = require("./lib/passwords");
const {
  askForMasterPassword,
  askForAction,
  doubleCheck,
} = require("./lib/questions");
const { close, connectToPwdDb } = require("./lib/database");
const { isMasterPasswordCorrect } = require("./lib/validation");
const chalk = require("chalk");
const { connect } = require("mongodb");
require("dotenv").config();

async function run() {
  await welcomeUser();
  const masterPassword = await askForMasterPassword();
  if (!(await isMasterPasswordCorrect(masterPassword))) {
    console.error(chalk.red("You better get out of here 👊!"));
    process.exit(1);
  }
  console.log(chalk.blue("Connecting to database...🚀"));

  await connectToPwdDb();

  const [passwordName, newPasswordValue] = readCommandLineArguments();
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
  if (newPasswordValue) {
    const answer = await doubleCheck();
    if (answer === true) {
      await setPassword(passwordName, newPasswordValue);
      console.log(
        chalk.green(`You added/updated the password for ${passwordName} 🔐`)
      );
    } else {
      console.log(chalk.red("What do you want, you dummy???"));
    }
    // } else {
    //   await getPassword(passwordName);
  }
  if (passwordName) {
    await getPassword(passwordName);
  }
  // await close();
}
// }
run();
