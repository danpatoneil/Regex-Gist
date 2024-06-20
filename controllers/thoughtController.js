const { Thought, User } = require("../models");

module.exports = {
  async getThoughts(req, res) {
    try {
      //find the list of all thoughts
      const thoughts = await Thought.find();
      // return it
      return res.status(200).json(thoughts);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  async getSingleThought(req, res) {
    try {
      // find the thought
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
      // return it
      return res.status(200).json(thought);
    } catch (error) {
      if (error.name === "CastError") {
        // if the error was "CastError" then the record was not found and the response should be a 404
        return res.status(404).json({
          message: `Provided thought ID ${req.params.thoughtId} is not valid`,
        });
      }
      return res.status(500).json(error);
    }
  },
  async createThought(req, res) {
    try {
      //find user by username
      const user = await User.findOne({ username: req.body.username });
      // if we found a user, then we can create the thought and attach it to the user's thoughts array
      if (user) {
        //create thought item
        const thought = await Thought.create(req.body);
        //add thought to thoughts array on user
        user.thoughts.push(thought._id);
        //save user
        await user.save();
        //return thought
        return res.status(200).json(thought);
      }
        //if there was no user found, respond that the username was not valid
      return res.status(404).json({
        message: `No user with name ${req.params.username} was found`,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  async deleteThought(req, res) {
    try {
      //find the thought, delete it
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });
      //get the user that owns the thought
      const user = await User.findOne({ username: thought.username });
      if (user) {
        //remove the thought from the user's thoughts list
        user.thoughts.splice(user.thoughts.indexOf(thought._id), 1);
        //save the user
        await user.save();
      }
      //return the deleted item
      return res.status(200).json(thought);
    } catch (error) {
      if (error.name === "CastError") {
        // if the error was "CastError" then the record was not found and the response should be a 404
        return res.status(404).json(error);
      }
      return res.status(500).json(error);
    }
  },
  async updateThought(req, res) {
    try {
      // find the specified thought, update it with the request body
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      return res.status(200).json(thought);
    } catch (error) {
      if (error.name === "CastError") {
        // if the error was "CastError" then the record was not found and the response should be a 404
        return res.status(404).json({
          message: `Provided thought ID ${req.params.thoughtId} is not valid`,
        });
      }
      return res.status(500).json(error);
    }
  },
};
