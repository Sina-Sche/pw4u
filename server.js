const express = require("express");
const { connectToPwdDb, deleteOne } = require("./lib/database");
const { getPassword, setPassword } = require("./lib/passwords");

const app = express();
app.use(express.json());
const port = 3000;
const chalk = require("chalk");

app.get("/api/passwords/:name", async (request, response) => {
  const { name } = request.params;
  try {
    const passwordValue = await getPassword(name);
    if (!passwordValue) {
      response
        .status(404)
        .send("Could not find the password you were looking for!");
      return;
    }
    response.send(passwordValue);
  } catch (error) {
    console.error(error);
    response.status(500).send("An internal server error occured!");
  }
});

app.post("/api/passwords/", async (request, response) => {
  const password = request.body;
  try {
    await setPassword(password.name, password.value);
    response.send(`You added a password for ${password.name}`);
  } catch (error) {
    console.error(error);
    response.status(500).send("An unexpected error occured. Try again later");
  }
  // const encryptedValue = CryptoJS.AES.encrypt(
  //   value,
  //   await readMasterPassword()
  // ).toString();
  // const collection = await setCollection("passwords");
  // const newPwObject = {
  //   name: name,
  //   value: encryptedValue,
  // };
  // await replaceOne(collection, newPwObject);
  // response.send("You added a new password");
});

app.delete("/api/passwords/:name", async (request, response) => {
  const { name } = request.params;
  await deleteOne(name);
  response.send("Delete request of password");
});

async function run() {
  console.log(chalk.blue("Connecting to database...🚀"));

  await connectToPwdDb();
  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
}

run();
