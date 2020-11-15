const inquirer = require("inquirer");
const chalk = require("chalk");

function readCommandLineArguments() {
  return process.argv.slice(2);
}

async function welcomeUser() {
  const { userName } = await inquirer.prompt([
    {
      type: "text",
      name: "userName",
      message: "👤 Enter your name:",
    },
  ]);

  return console.log(
    chalk.green(`Welcome to your Password Manager, ${userName}`)
  );
}
exports.welcomeUser = welcomeUser;
exports.readCommandLineArguments = readCommandLineArguments;
