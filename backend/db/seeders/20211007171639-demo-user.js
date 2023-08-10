'use strict';
const Chance = require('chance');
const chance = new Chance()

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const bcrypt = require('bcryptjs');

function getRandomDate() {
  // Define the start and end dates
  const startDate = new Date(1980, 0, 1);  // January 1, 1980
  const endDate = new Date(2005, 11, 31);  // December 31, 2005

  // Calculate a random date between the start and end dates
  const timeDiff = endDate.getTime() - startDate.getTime();
  const randomTime = Math.random() * timeDiff + startDate.getTime();
  const randomDate = new Date(randomTime);

  // Format the date to 'mm/dd/yyyy'
  const month = ("0" + (randomDate.getMonth() + 1)).slice(-2);  // getMonth() returns 0-11, so we add 1
  const day = ("0" + randomDate.getDate()).slice(-2);  // getDate() returns 1-31
  const year = randomDate.getFullYear();

  return month + "/" + day + "/" + year;
}

// Generate 1 or 2 randomly
function randomWholeNumberBetweenOneAndTwo() {
  return Math.floor(Math.random() * 2) + 1;  // Math.random() generates a number between 0 (inclusive) and 1 (exclusive)
}

const mFObj = {
  '1': 'male',
  '2': 'female'
}

const avatarFemaleObj = {
  '1': 'https://porfoliopicturesbucket.s3.us-west-1.amazonaws.com/Random_Avatars/femaleAvatar1.png',
  '2': 'https://porfoliopicturesbucket.s3.us-west-1.amazonaws.com/Random_Avatars/femaleAvatar10.png',
  '3': 'https://porfoliopicturesbucket.s3.us-west-1.amazonaws.com/Random_Avatars/femaleAvatar10.png',
  '4': 'https://porfoliopicturesbucket.s3.us-west-1.amazonaws.com/Random_Avatars/femaleAvatar12.png',
  '5': 'https://porfoliopicturesbucket.s3.us-west-1.amazonaws.com/Random_Avatars/femaleAvatar13.png',
  '6': 'https://porfoliopicturesbucket.s3.us-west-1.amazonaws.com/Random_Avatars/femaleAvatar14.png',
  '7': 'https://porfoliopicturesbucket.s3.us-west-1.amazonaws.com/Random_Avatars/femaleAvatar15.png',
  '8': 'https://porfoliopicturesbucket.s3.us-west-1.amazonaws.com/Random_Avatars/femaleAvatar2.png',
  '9': 'https://porfoliopicturesbucket.s3.us-west-1.amazonaws.com/Random_Avatars/femaleAvatar3.png',
  '10': 'https://porfoliopicturesbucket.s3.us-west-1.amazonaws.com/Random_Avatars/femaleAvatar4.png',
  '11': 'https://porfoliopicturesbucket.s3.us-west-1.amazonaws.com/Random_Avatars/femaleAvatar5.png',
  '12': 'https://porfoliopicturesbucket.s3.us-west-1.amazonaws.com/Random_Avatars/femaleAvatar6.png',
  '13': 'https://porfoliopicturesbucket.s3.us-west-1.amazonaws.com/Random_Avatars/femaleAvatar7.png',
  '14': 'https://porfoliopicturesbucket.s3.us-west-1.amazonaws.com/Random_Avatars/femaleAvatar8.png',
  '15': 'https://porfoliopicturesbucket.s3.us-west-1.amazonaws.com/Random_Avatars/femaleAvatar9.png',
};

const avatarMaleObj = {
  '16': 'https://porfoliopicturesbucket.s3.us-west-1.amazonaws.com/Random_Avatars/maleAvatar1.png',
  '17': 'https://porfoliopicturesbucket.s3.us-west-1.amazonaws.com/Random_Avatars/maleAvatar9.png',
  '18': 'https://porfoliopicturesbucket.s3.us-west-1.amazonaws.com/Random_Avatars/maleAvatar8.png',
  '19': 'https://porfoliopicturesbucket.s3.us-west-1.amazonaws.com/Random_Avatars/maleAvatar7.png',
  '20': 'https://porfoliopicturesbucket.s3.us-west-1.amazonaws.com/Random_Avatars/maleAvatar6.png',
  '21': 'https://porfoliopicturesbucket.s3.us-west-1.amazonaws.com/Random_Avatars/maleAvatar5.png',
  '22': 'https://porfoliopicturesbucket.s3.us-west-1.amazonaws.com/Random_Avatars/maleAvatar4.png',
  '23': 'https://porfoliopicturesbucket.s3.us-west-1.amazonaws.com/Random_Avatars/maleAvatar3.png',
  '24': 'https://porfoliopicturesbucket.s3.us-west-1.amazonaws.com/Random_Avatars/maleAvatar2.png',
  '25': 'https://porfoliopicturesbucket.s3.us-west-1.amazonaws.com/Random_Avatars/maleAvatar15.png',
  '26': 'https://porfoliopicturesbucket.s3.us-west-1.amazonaws.com/Random_Avatars/maleAvatar14.png',
  '27': 'https://porfoliopicturesbucket.s3.us-west-1.amazonaws.com/Random_Avatars/maleAvatar13.png',
  '28': 'https://porfoliopicturesbucket.s3.us-west-1.amazonaws.com/Random_Avatars/maleAvatar12.png',
  '29': 'https://porfoliopicturesbucket.s3.us-west-1.amazonaws.com/Random_Avatars/maleAvatar11.png',
  '30': 'https://porfoliopicturesbucket.s3.us-west-1.amazonaws.com/Random_Avatars/maleAvatar10.png',
}

const generateUsers = (amount) => {
  const userArr = [];

  const demoUser = {
    email: 'demo@user.io',
    username: 'Demo User',
    imgSrc: `${chance.avatar({protocol: 'https', fileExtension: 'png'})}`,
    zipCode: `${chance.zip()}`,
    birthday: '1995-02-04',
    hashedPassword: bcrypt.hashSync('password')
  }
  userArr.push(demoUser);

  for (let i = 0; i < amount; i++) {
    const fakeBirthday = getRandomDate();
    const oneTwo = randomWholeNumberBetweenOneAndTwo();
    const userObj = {
      email: `${chance.email({domain: 'example.com'})}`,
      username: i < 16 ? `${chance.first({gender: `female`})} ${chance.last()}` : `${chance.first({gender: `male`})} ${chance.last()}`,
      imgSrc: i < 16 ? `${avatarFemaleObj[i]}` : `${avatarMaleObj[i]}`,
      zipCode: `${chance.zip()}`,
      birthday: `${fakeBirthday}`,
      hashedPassword: bcrypt.hashSync('password')
    }
    userArr.push(userObj)
  }
  return userArr;
}

const populate = [...generateUsers(30)]

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, populate, {});
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkDelete(options, null, {});
  }
};
