const express = require("express");
const path = require("path");
const { connectToPwdDb, deleteOne } = require("./lib/database");
const { getPassword, setPassword, deletePw } = require("./lib/passwords");

const app = express();
app.use(express.json());
const port = process.env.PORT || 3600;
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
});

app.delete("/api/passwords/:name", async (request, response) => {
  try {
    const { name } = request.params;
    const result = await deletePw(name);
    console.log(result);
    if (result.deletedCount === 0) {
      return response.status(404).send("Password does not exist");
    }
    response.send(`${name} password deleted`);
  } catch (error) {
    console.error(error);
    response.status(500).send("An unexpected error occured. Try again later");
  }
});

app.use(express.static(path.join(__dirname, "client/build")));

app.use(
  "/storybook",
  express.static(path.join(__dirname, "client/storybook-static"))
);

app.get("*", (request, response) => {
  response.sendFile(path.join(__dirname, "client/build", "index.html"));
});

async function run() {
  console.log(chalk.blue("Connecting to database...🚀"));

  await connectToPwdDb();
  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
}

run();
