const db = require('../config/connection');
const { User, Question } = require('../models');

const userSeeds = require('./userSeeds.json');
const questionSeeds = require('./questionSeeds.json');

db.once('open', async () => {
  try {
    await User.deleteMany({});
    await User.create(userSeeds);

    await Question.deleteMany({});
    await Question.create(questionSeeds);

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  process.exit(0);
});
