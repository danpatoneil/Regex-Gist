const { Thought, User } = require('../models');

module.exports = {
    async getThoughts(req, res){
        try {
          const thoughts = await Thought.find()
          return res.status(200).json(thoughts);
        } catch (error) {
            // console.log(error);
            return res.status(500).json(error);
        }
    },
    async getSingleThought(req, res){
        try {
          const thought = await Thought.findOne({_id:req.params.thoughtId})
          if(!thought) return res.status(404).json({message:'thought not found'})
          return res.status(200).json(thought);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    async createThought(req, res){
        try {
            //find user by username
            const user = await User.findOne({name:req.body.username})
            //if user is not found, return a 404 saying user was not found
            if(!user) return res.status(404).json({message:`No user with name ${req.body.username} found`})
            //create thought item
            const thought = await Thought.create(req.body);
            //add thought to thoughts array on user
            user.thoughts.push(thought._id);
            //save user
            await user.save();
            //return thought
            return res.status(200).json(thought)
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    async deleteThought(req, res){
        try {
            //find the thought, delete it
            const thought = await Thought.findOneAndDelete({_id:req.params.thoughtId});
            //get the user that owns the thought
            const user = await User.findOne({name:thought.username});
            //remove the thought from the user's thoughts list
            user.thoughts.splice(user.thoughts.indexOf(thought._id), 1)
            //save the user
            await user.save()
            //return the deleted item
            return res.status(200).json(thought)
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    async updateThought(req, res){
        try {
            const thought = await Thought.findOneAndUpdate(
              {_id:req.params.thoughtId},
              {$set: req.body},
              {runValidators:true, new:true});
            if(!thought) return res.status(404).json({message:`Thought with ID ${req.params.thoughtId} not found`})
            return res.status(200).json(thought);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}



