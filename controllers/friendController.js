const { User } = require("../models");

module.exports = {
  async addFriend(req, res) {
    try {
      if(req.params.userId==req.params.friendId) return res.json({message:'User cannot be added to their own friends list'})
      const user = await User.findOne({ _id: req.params.userId });
      const friend = await User.findOne({ _id: req.params.friendId });
      if(!user) return res.status(404).json({message: 'User ID specified was not found'});
      if(!friend) return res.status(404).json({message: 'Friend ID specified was not found'});
      user.friends.push(friend._id);
      await user.save();
      return res.status(200).json(user);
    } catch (error) {
        // if the error was "CastError" then the record was not found because the user ID was invalid and the response should be a 404
        if (error.name === "CastError") {
          return res
            .status(404)
            .json({
              message: `Provided user ID ${req.params.userId} or friend ID ${req.params.friendId} is not valid`,
            });
        }
      return res.status(500).json(error);
    }
  },
  async deleteFriend(req, res) {
    try {
      //find user
      const user = await User.findOne({ _id: req.params.userId });
      //find friend in friends list
      const friendIndex = user.friends.indexOf(req.params.friendId);
      if (friendIndex) {
        //if friend is present, remove friend from friends list
        user.friends.splice(friendIndex, 1);
        //save user
        await user.save();
        // return that friend was removed
        return res
          .status(200)
          .json({
            message: `friend ${req.params.friendId} remove from user ${user.name}`,
          });
      }
      //otherwise, return 404
      return res
        .status(404)
        .json({
          message:
            "Friend ID was not found in specified User ID's list of friends, or User ID is invalid",
        });
    } catch (error) {
      // if the error was "CastError" then the record was not found because the user ID was invalid and the response should be a 404
      if (error.name === "CastError") {
        return res
          .status(404)
          .json({
            message: `Provided user ID ${req.params.userId} or friend ID ${req.params.friendId} is not valid`,
          });
      }
      return res.status(500).json(error);
    }
  },
};
