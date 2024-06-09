const {generateUserList} = require('./utils/data');

const list = generateUserList()
const emails = list.map(obj => obj.email);
console.log(emails)

for (const user of list) {
    const regex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    let passed = false;
    if(regex.test(user.email)) passed=true;
    console.log(`${user.email} passed is ${passed}`)
}
