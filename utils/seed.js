const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { getRandomName, getRandomThoughts } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  await User.deleteMany({});
  await Thought.deleteMany({});

  const users = [];
  const thoughts = getRandomThoughts(30);

  for (let i = 0; i < 20; i++) {
    const username = getRandomName();
    const email = `${username.replace(" ", "")}@gmail.com`;
    const friends = [];
    const thoughts = [];

    users.push({
      username,
      email,
      friends,
      thoughts,
    });
  }

  await User.collection.insertMany(users);
  await Thought.collection.insertMany(thoughts);

  // loop through the saved applications, for each application we need to generate a application response and insert the application responses
  console.table(users);
  console.table(thoughts);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
