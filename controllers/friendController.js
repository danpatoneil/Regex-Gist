const { User } = require("../models");

module.exports = {
  async addFriend(req, res) {
    try {
      //check that user has same id as friend
      if (req.params.userId == req.params.friendId)
        return res.json({
          message: "User cannot be added to their own friends list",
        });
      //find user
      const user = await User.findOne({ _id: req.params.userId });
      //find friend
      const friend = await User.findOne({ _id: req.params.friendId });
      //return failures if either user isn't found
      if (!user)
        return res
          .status(404)
          .json({ message: "User ID specified was not found" });
      if (!friend)
        return res
          .status(404)
          .json({ message: "Friend ID specified was not found" });
      //add friend to user's friends list
      user.friends.push(friend._id);
      await user.save();
      //add user to friend's list
      friend.friends.push(user._id);
      await friend.save();
      return res.status(200).json(user);
    } catch (error) {
      // if the error was "CastError" then the record was not found because the user ID was invalid and the response should be a 404
      if (error.name === "CastError") {
        return res.status(404).json({
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
      //find friend
      const friend = await User.findOne({ _id: req.params.friendId });
      if (user.friends.includes(req.params.friendId)) {
        //find friend in friends list
        const friendIndex = user.friends.indexOf(req.params.friendId);
        //if friend is present, remove friend from friends list
        user.friends.splice(friendIndex, 1);
        //save user
        await user.save();
      }else{return res.status(404).json({message:'User not found in friends list'})}
      if (friend.friends.includes(req.params.userId)) {
        //find index of user in friend's friends list
        const userIndex = friend.friends.indexOf(req.params.userId);
        //remove user from friend's list
        friend.friends.splice(userIndex, 1);
        //save friend
        await friend.save();
      }else{return res.status(404).json({message:'User not found in friends list'})}
      // return that friend was removed
      return res.status(200).json({
        message: `friend ${req.params.friendId} remove from user ${user.username}`,
      });
    } catch (error) {
      // if the error was "CastError" then the record was not found because the user ID was invalid and the response should be a 404
      if (error.name === "CastError") {
        return res.status(404).json({
          message: `Provided user ID ${req.params.userId} or friend ID ${req.params.friendId} is not valid`,
        });
      }
      return res.status(500).json(error);
    }
  },
};
