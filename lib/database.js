const { MongoClient } = require("mongodb");
const chalk = require("chalk");
require("dotenv").config();

let client;
let db;
let collection;

async function connect(url, dbName) {
  // Use connect method to connect to the Server
  client = await MongoClient.connect(url, { useUnifiedTopology: true });
  db = client.db(dbName);
  collection = db.collection("passwords");
}

async function connectToPwdDb() {
  await connect(process.env.MONGO_DB_URI, process.env.MONGO_DB_NAME);
  console.log(chalk.green("You are now connected to the database 💫"));
}

function close() {
  return client.close();
}

function setCollection(name) {
  collection = db.collection(name);
  return collection;
}

async function replaceOne(collection, newPwObject) {
  try {
    await collection.replaceOne({ name: newPwObject.name }, newPwObject, {
      upsert: true,
    });
  } catch (e) {
    console.error(e);
  }
}

async function findPwfor(passwordName) {
  try {
    const result = await collection.findOne({ name: passwordName });
    return result;
  } catch (error) {
    console.error(error);
  }
}

async function deleteOne(passwordName) {
  try {
    console.log(`❌ You deleted the ${passwordName} password!`);
    return await collection.deleteOne({ name: passwordName });
  } catch (error) {
    console.error(error);
  }
}

exports.connect = connect;
exports.connectToPwdDb = connectToPwdDb;
exports.close = close;
exports.setCollection = setCollection;
exports.replaceOne = replaceOne;
exports.findPwfor = findPwfor;
exports.deleteOne = deleteOne;
