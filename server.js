const express = require("express");
const { connectToPwdDb, findPwfor } = require("./lib/database");
const { getPassword } = require("./lib/passwords");
const app = express();
const port = 3000;
const chalk = require("chalk");

app.get("/api/passwords/:name", async (request, response) => {
  const { name } = request.params;
  const passwordValue = await getPassword(name);
  response.send(passwordValue);
});
app.put("/api/passwords/add/:name/:value", async (request, response) => {
  const { name } = request.params;
  const { value } = request.params;
  const encryptedValue = CryptoJS.AES.encrypt(
    value,
    await readMasterPassword()
  ).toString();
  const collection = await setCollection("passwords");
  const newPwObject = {
    name: name,
    value: encryptedValue,
  };
  await replaceOne(collection, newPwObject);
  response.send("You added a new password");
});

app.delete("/api/passwords/delete/:name", async (request, response) => {
  app.get;
  await deleteOne(request.name);
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
