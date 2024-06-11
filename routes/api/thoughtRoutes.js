const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought
} = require('../../controllers/thoughtController');

const {
    addReaction,
    deleteReaction
} = require('../../controllers/reactionController')

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);
//the post route requires a JSON body

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought).put(updateThought);

// thought body format
// {
//     "thoughtText":"asldfkjsdlfkasjdfs",
//     "username":"sdfasdfsd"
// }

router.route('/:thoughtId/reactions/').post(addReaction).delete(deleteReaction)

// reaction body format
// {
//   "reactionBody": "whatever",
// 	"username": "fsfdf"  //has to be a real username
// }

module.exports = router;
