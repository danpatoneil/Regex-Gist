const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser
} = require('../../controllers/userController');

const {
    addFriend,
    deleteFriend,
} = require('../../controllers/friendController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);
// {
//     "name":"abcdefg",
//     "email":"abcdefg@example.com"
//     OPTIONAL "thoughts": [""], //thought _id's
//     OPTIONAL "friends" : [""] //user _id's, not the same as the userId
// }


// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;
