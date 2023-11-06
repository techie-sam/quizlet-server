const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Question = require('../models/Question');

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('DB connection successful!'));

const getModel = (model) => {
  switch (model) {
    case 'question':
      return Question;
    default:
      return null;
  }
};

const readFile = (fileName = !process.argv[4]) => {
  const content = JSON.parse(
    fs.readFileSync(`${__dirname}/${fileName}.json`, 'utf-8'),
  );
  console.log(`${__dirname}/${fileName}.json`);

  return content;
};

const load = async (Model) => {
  console.log(Model);
  readFile('react');
  //   console.log();
  //   await Model.create(
  //     JSON.parse(
  //       fs.readFileSync(`${__dirname}/${Model.collection.name}.json`, 'utf-8'),
  //     ),
  //     { validateBeforeSave: false },
  //   );
  //   console.log(`${Model.collection.name} successfully loaded!`);
  //   if (data) process.exit();
};

const importData = async (Model, file) => {
  try {
    await load(Model);
  } catch (err) {
    console.log(err);
  }
};

const model = process.argv[3];
const file = process.argv[4];
if (process.argv[2] === '--import') {
  importData(getModel(model));
} else if (process.argv[2] === '--delete') {
  //   deleteData();
}
process.exit();
