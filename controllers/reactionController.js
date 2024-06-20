const { Thought, User } = require("../models");

module.exports = {
  async addReaction(req, res) {
    try {
      //find thought
      const thought = await Thought.findOne({_id:req.params.thoughtId});
      //if thought not found, return 404
      if(!thought) return res.status(404).json({message:'Thought not found'});
      //find user
      const user = await User.findOne({username:req.body.username});
      //if user not found, return 404
      if(!user) return res.status(404).json({message:'No user with specified username found'});
      //add reaction object to thought
      thought.reactions.push(req.body);
      //save thought
      thought.save();
      //return thought
      return res.status(200).json(thought);
    } catch (error) {
        // if the error was "CastError" then the record was not found because the user ID was invalid and the response should be a 404
        if (error.name === "CastError") {
          return res
            .status(404)
            .json({
              message: `Provided user ID ${req.params.thoughtId} is not valid`,
            });
        }
      return res.status(500).json(error);
    }
  },
  async deleteReaction(req, res) {
    //the layout of assignment seemingly suggested that the API route for deleting the reaction should not include the reaction ID as a parameter. I wrote that, but it seemed silly so I also wrote this one too.
    try {
      //find Thought
      const thought = await Thought.findOne({_id:req.params.thoughtId});
      // if thought not found return "thought not found"
      if(!thought) return res.status(404).json({message:'Thought not found'});
      //find reaction index within thought's reactions array
      const reactionIndex = thought.reactions.findIndex(reaction => reaction.reactionId==req.params.reactionId);
      //if reaction index not found, return `reaction not found within thought`
      if(reactionIndex==-1) return res.status(404).json({message:'Reaction not found in thought'});
      //splice out of array
      thought.reactions.splice(reactionIndex, 1);

      //save thought
      thought.save();
      //return "reaction deleted"
      return res.status(200).json(thought);
    } catch (error) {
      // if the error was "CastError" then the record was not found because the user ID was invalid and the response should be a 404
      if (error.name === "CastError") {
        return res
          .status(404)
          .json({
            message: `Provided thought ID ${req.params.thoughtId} is not valid`,
          });
      }
      return res.status(500).json(error);
    }
  },
};
