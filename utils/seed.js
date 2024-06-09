const connection = require('../config/connection');
const { Thought, User } = require('../models');
const { getRandomUser, getRandomThought, getRandomReactions, generateUserList, getRandomArrItem } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
    // Delete the collections if they exist
    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
      await connection.dropCollection('thoughts');
    }

    let usersCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (usersCheck.length) {
      await connection.dropCollection('users');
    }

//   Add users to the collection and await the results
  const userData = await User.insertMany(generateUserList());

//  Generate Thoughts
const thoughts = [];

for (let index = 0; index < 20; index++) {
    const reactions = getRandomReactions(3);
    const username = getRandomUser();
    const thoughtText = getRandomThought();
    thoughts.push({
        thoughtText,
        username,
        reactions,
    })
}
// add the thought objects to the database
const thoughtData = await Thought.insertMany(thoughts);
// add thoughts to friends
for (const thought of thoughtData) {
    // console.log(thought.username);
    const userItem = await User.findOne({name:thought.username})
    // console.log(userItem)
    userItem.thoughts.push(thought._id);
    await userItem.save();
    // console.log(`Thought ${thought._id} saved to user ${userItem.name}`);
}

//add friends to users
for (const user of userData) {
    const friends = []
    do {
        const friend = getRandomArrItem(userData)
        // console.log(friend.name);
        if(friend.name!=user.name) friends.push(friend);
    } while (friends.length<=2);
    // console.log(friends);
    for (const friend of friends) {
        if(!user.friends.includes(friend._id)){
        // console.log(`adding ${friend.name} and ${user.name} to one another's friends lists`)
        user.friends.push(friend._id);
        friend.friends.push(user._id);}
        // else console.log(`${friend.name} and ${user.name} are already friends`);
        await friend.save();
    }
    // console.log(`saving user ${user.name}`)
    await user.save();
}

  // Log out the seed data to indicate what should appear in the database
//   console.table(thoughtData);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
