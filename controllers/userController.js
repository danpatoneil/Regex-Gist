const { Thought, User } = require("../models");
// const { findOneAndUpdate } = require("../models/User");

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find().select("-__v");
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).select(
        "-__v"
      );
      return res.status(200).json(user);
    } catch (error) {
      // if the error was "CastError" then the record was not found because the user ID was invalid and the response should be a 404
      if (error.name === "CastError") {
        return res
          .status(404)
          .json({ message: `Provided user ID${req.params.userId} is not valid` });
      }
      return res.status(500).json(error);
    }
  },
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  async deleteUser(req, res) {
    try {
      //find user and delete it
      const user = await User.findOneAndDelete({ _id: req.params.userId });
      //for each thought in the thoughts array, also delete the thoughts
      for (const thoughtId of user.thoughts) {
        const thought = await Thought.findOneAndDelete({ _id: thoughtId });
        console.log(`Deleted thought ${thought._id}`);
      }
      return res.status(200).json({ message: "user deleted", user });
    } catch (error) {
      // if the error was "CastError" then the record was not found because the user ID was invalid and the response should be a 404
      if (error.name === "CastError") {
        return res
          .status(404)
          .json({ message: `Provided user ID${req.params.userId} is not valid` });
      }
      return res.status(500).json(error);
    }
  },
  async updateUser(req, res) {
    try {
      //find user by parameter passed userId, update
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      //return updated user
      return res.status(200).json(user);
    } catch (error) {
      if (error.name === "CastError") {
        // if the error was "CastError" then the record was not found because the user ID was invalid and the response should be a 404
        return res
          .status(404)
          .json({ message: `Provided user ID${req.params.userId} is not valid` });
      }
      return res.status(500).json(error);
    }
  },
};
