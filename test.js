const {Thought} = require('./models');

async function getThoughtWrapper(){
    const thoughts = await Thought.find()
    console.log(thoughts);
}
