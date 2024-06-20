const users = [
    'Dog',
    'Sreve',
    'Jarmicheal',
    'Dog2',
    'DogWasTaken',
    'Jabringabones',
    'DortmundUponTwine',
    'Rick',
    'Ratte',
    'ImJustSoTired',
    'WaterMain',
    'CrazyDragon777',
    'DoopFrog',
    'CyanYoh',
    'Viktoream',
    'CheekyMisfit',
    'BigOunce',
    'CyberDan',
    'CyberDog',
    'Cyube',
  ];

  const emails = [
    'dog@example.com',
    'dog2@example.com',
    'dog3@example.com',
    'dog4@example.com',
    'dog5@example.com',
    'dog6@example.com',
    'dog7@example.com',
    'dog8@example.com',
    'dog9@example.com',
    'dog10@example.com',
    'Maddy@example.com',
    'Laine@example.com',
    'Madelaine@example.com',
    'm.Fussy@example.com',
    'madFussy@example.com',
    'mads@example.com',
    'baddyMaddy@example.com',
    'WaterLaine@example.com',
    'MadDogMaddy@example.com',
    'clunkerz@example.com',
  ]

  const thoughts = [
    'I wonder what the presidents cell number is',
    'I just took out a life insurance policy on my wife, hope nothing happens to her!',
    'I know that',
    'You know you got here first',
    'Oh baby, it is two tickets to the worm show',
    'Has anyone seen my cube recently',
    'I wonder what it would be like to die of asphyxiation on the moon',
    'Is Mars really red or is the government lying to us about that too',
    'GRUNTY, INDUSTRY, GRUNTY, INDUSTRY',
    'Yeah can I get uuuuh 1 sudafed, 1 zyrtec, 7mg of adderall and a cup of coffee?',
    'I need to get started on that quiver'
  ];

  const reactions = [
    'Which kind lol', 'Me personally I believe the lying news media is lying and the president is actually dead', '123-456-7890 I think but he stopped answering after my 3rd call',
    '@Police keep an eye on this guy', "I will also kill this guy's wife", "This counts as a confession",
    'What does he know', 'You got here first', 'Circus in town?', "WOWEEE, YEAH",
    'Have you checked your tesla?', "I'll tell you where it is for $3000", "That happened to my buddy Eric, I wouldn't recommend it",
    "NOOOOOOOO STOP IT STOP IT STOP IT", "No, now for the last time stop coming to this Taco Bell location", "Quiver?"
  ];

  // Get a random item given an array
  const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

  // Gets a random user
  const getRandomUser = () =>
    `${getRandomArrItem(users)}`;

  // Gets a random thought
  const getRandomThought = () =>
    `${getRandomArrItem(thoughts)}`;

  //Gets an array of user-email pairs for generating an array of user objects
  const generateUserList = () => {
    const userList = [];
    const emailLists= emails;
    for (const username of users) {
        userList.push({
            username,
            email: emailLists.pop()
        })
    }
    return userList;
  }

  // Function to generate random assignments that we can add to student object.
  const getRandomReactions = (int) => {
    const results = [];
    for (let i = 0; i < int; i++) {
      results.push({
        reactionBody: getRandomArrItem(reactions),
        username: getRandomUser(),
      });
    }
    return results;
  };



  // Export the functions for use in seed.js
  module.exports = { getRandomUser, getRandomThought, getRandomReactions, generateUserList, getRandomArrItem };
